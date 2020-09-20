var express = require('express');
var router = express.Router();
var firebase = require('firebase-admin');
var storage = firebase.storage();
let db = firebase.firestore();
var fs = require('fs');
const gcs = require('@google-cloud/storage');

//---------------- Controller ----------------//
// GET /room  (แสดง room ทั้งหมดใน feed page)
// GET /roomDetail (แสดงรายละเอียดของแต่ละ room)
// GET /members (แสดงรายชื่อสมาชิกใน room)
// POST /room/createRoom  (สร้าง room)
// PUT /room/editRoom (แก้ไขข้อมูล room)
// DELETE /room/deleteRoom  (ลบ room)
// POST /room/uploadRoomCoverImage (ส่งรูป RoomCover มาเก็บใน Cloud storage)
// POST /room/uploadRoomQrCodeImage (ส่งรูป RoomQrCode มาเก็บใน Cloud storage)

router.get('/', async function (req, res, next) {
    let RoomList = await getAllRoom();
    res.status(200).json(RoomList);
});

router.get('/roomDetail', async function (req, res, next) {
    let datas = req.query;
    if (datas.roomID == undefined || datas.roomID == null || datas.roomID == '') {
        res.status(400).json({
            message: "The Data was empty or undefined"
        })
    } else {
        let roomDetail = await getRoomDetail(datas);
        res.status(200).json(roomDetail);
    }
});

router.get('/members', async function (req, res, next) {
    let datas = req.query;
    if (datas.roomID == undefined || datas.roomID == null || datas.roomID == '') {
        res.status(400).json({
            message: "The Data was empty or undefined"
        })
    } else {
        let Members = await getRoomMembers(datas);
        res.status(200).json(Members);
    }
})

router.post('/createRoom', async function (req, res, next) {
    let datas = req.body;
    if (datas.lineID == undefined || datas.lineID == null || datas.lineID == '' ||
        datas.displayName == undefined || datas.displayName == null || datas.displayName == '' ||
        datas.roomName == undefined || datas.roomName == null || datas.roomName == '' ||
        datas.province == undefined || datas.province == null || datas.province == '' ||
        datas.startDate == undefined || datas.startDate == null || datas.startDate == '' ||
        datas.endDate == undefined || datas.endDate == null || datas.endDate == '' ||
        datas.maxMember == undefined || datas.maxMember == null || datas.maxMember == '' ||
        datas.genderCondition == undefined || datas.genderCondition == null || datas.genderCondition == '' ||
        datas.ageCondition == undefined || datas.ageCondition == null || datas.ageCondition == '' ||
        datas.roomStatus == undefined || datas.roomStatus == null || datas.roomStatus == '' ||
        datas.createDate == undefined || datas.createDate == null || datas.createDate == '') {
        console.log('Alert: The Data was empty or undefined"')
        return res.status(400).json({
            message: "The Data was empty or undefined"
        })
    } else {
        let createRooms = await createRoom(datas);
        console.log('Alert: Create Room Success')
        res.status(201).json(createRooms)
    }
});

router.put('/editRoom', async function (req, res, next) {
    let datas = req.body;
    if (datas.roomID == undefined || datas.roomID == null || datas.roomID == '' ||
        datas.lineID == undefined || datas.lineID == null || datas.lineID == '' ||
        datas.roomName == undefined || datas.roomName == null || datas.roomName == '' ||
        datas.province == undefined || datas.province == null || datas.province == '' ||
        datas.startDate == undefined || datas.startDate == null || datas.startDate == '' ||
        datas.endDate == undefined || datas.endDate == null || datas.endDate == '' ||
        datas.tripDetails == undefined || datas.tripDetails == null || datas.tripDetails == '' ||
        datas.maxMember == undefined || datas.maxMember == null || datas.maxMember == '' ||
        datas.genderCondition == undefined || datas.genderCondition == null || datas.genderCondition == '' ||
        datas.ageCondition == undefined || datas.ageCondition == null || datas.ageCondition == '' ||
        //datas.qrCode == undefined || datas.qrCode == null || datas.qrCode == '' ||
        //datas.roomCover == undefined || datas.roomCover == null || datas.roomCover == '' ||
        datas.roomStatus == undefined || datas.roomStatus == null || datas.roomStatus == '') {
        console.log('Alert: The Data was empty or undefined"')
        res.status(400).json({
            message: "The Data was empty or undefined"
        })
    } else {
        const roomRef = db.collection('Room');
        const checkPermissionRef = roomRef.where('roomID', '==', datas.roomID).where('ownerRoomID', '==', datas.lineID);
        await checkPermissionRef.get().then(async data => {
            if (data.empty) {
                console.log('No matching documents.');
                return;
            } else {
                await updateRoom(datas);
                res.status(201).json({
                    message: "Edit Room Success",
                })
            }
        })
    }
});

router.delete('/deleteRoom', async function (req, res, next) {
    let datas = req.body;
    if (datas.roomID == undefined || datas.roomID == null || datas.roomID == '') {
        console.log('Alert: The Data was empty or undefined"')
        res.status(400).json({
            message: "The Data was empty or undefined"
        })
    } else {
        let checkPermission = await db.collection('Room').where('roomID', '==', datas.roomID).where('ownerRoomID', '==', datas.lineID)
        checkPermission.get().then(async data => {
            if (data.exists) {
                await deleteRoom(req.body);
                console.log('Alert: Delete Room Success')
                res.status(200).json({
                    message: "Delete Room Success",
                })
            } else {
                console.log('Alert: You can not delete Room ')
                res.status(400).json({
                    message: "You can not delete Room",
                })
            }
        })
    }
});

router.post('/uploadRoomCoverImage', async function (req, res, next) {
    let image = req.body.image;
    let name = req.body.nameImage;
    // console.log('request image: ', image);
    let imageURL = await uploadRoomCoverImageToCloudStorage(image + '', name);
    // console.log('Response Image URL to Frontend: ', imageURL);
    res.status(200).json(imageURL);
});

router.post('/uploadRoomQrCodeImage', async function (req, res, next) {
    let image = req.body.image;
    let name = req.body.nameImage;
    // console.log('request image: ', image);
    let imageURL = await uploadRoomQrCodeImageToCloudStorage(image + '', name);
    // console.log('Response Image URL to Frontend:', imageURL);
    res.status(200).json(imageURL);
});

//---------------- Function ----------------//
async function getAllRoom() {
    let RoomList = [];
    let showAllRoomRef = db.collection("Room").orderBy("createDate","desc");
    // let showAllRoomRef = db.collection("Room");
    await showAllRoomRef.get().then(snapshot => {
        snapshot.forEach(doc => {
            RoomList.push(doc.data());
        });
    })
        .catch(err => {
            console.log('Error getting Room', err);
        });
    return RoomList;
};

async function getRoomDetail(datas) {
    let RoomDetail = [];
    let CheckRoomID = db.collection('Room').doc(datas.roomID);
    await CheckRoomID.get().then(doc => {
        RoomDetail.push(doc.data());
    })
        .catch(err => {
            console.log('Error getting Room detail', err);
        });
    return RoomDetail;
};

async function getRoomMembers(datas) {
    let Members = [];
    let OwnerMember = [];
    let getOwnerRoomIDRef = db.collection('Room').doc(datas.roomID);

    await getOwnerRoomIDRef.get().then(doc1 => {
        OwnerMember.push(doc1.data());
    })

    let OwnerRoomID = OwnerMember.map(a => a.ownerRoomID).toString();
    let getOwnerProfileMember = db.collection('AccountProfile').doc(OwnerRoomID);

    await getOwnerProfileMember.get().then(doc2 => {
        Members.push(doc2.data());
    })

    let showAllMembersRef = db.collection('Room').doc(datas.roomID).collection('Members');
    await showAllMembersRef.get().then(snapshot => {
        snapshot.forEach(doc => {
            Members.push(doc.data());
        });
    })
        .catch(err => {
            console.log('Error getting Room Members', err);
        });

    return Members;
};

async function generateRoomID() {
    function ran() {
        let myRoomId = Math.floor(Math.random() * 1000000) + 1;
        return myRoomId;
    }

    let result;
    let checkDocumentisEmpty = true;

    do {
        let id = await ran();
        let CheckRoomIDRef = db.collection('Room');
        let roomID = 'R_' + id;
        let query = await CheckRoomIDRef.doc(roomID).get()
            .then(doc => {
                // ถ้าไม่มีข้อมูลอยู่
                if (!doc.exists) {
                    checkDocumentisEmpty = false;
                    result = 'R_' + id;
                    // console.log('You can use Room ID : ' + result);
                }
            })
    } while (checkDocumentisEmpty == true)
    return result;
};

async function uploadRoomCoverImageToCloudStorage(image, name) {
    //save image to project
    let base64Image = image.split(';base64,').pop();
    await fs.writeFile(`./controller/${name}.png`, base64Image, { encoding: 'base64' }, function (err) {
        console.log('>>> File created <<<');
    });

    //upload to cloud storage
    let storageRef = storage.bucket();
    await storageRef.upload(`./controller/${name}.png`, {
        destination: `RoomCover/${name}.png`,
        gzip: true,
        metadata: {
            cacheControl: 'public, max-age=31536000'
        }
    }).then(async () => {
        //delete image from project
        let path = `./controller/${name}.png`;
        await fs.unlink(path, (err) => {
            if (err) {
                console.error(err)
            }
            console.log('>>> File remove <<<')
        })
    })

    //get URL to frontend
    let file = storageRef.file(`RoomCover/${name}.png`);
    await file.getSignedUrl({
        action: 'read',
        expires: '03-09-2491'
    }).then(signedUrls => {
        singnedUrls = signedUrls[0];
    });

    return singnedUrls;
}

async function uploadRoomQrCodeImageToCloudStorage(image, name) {
    //save image to project
    let base64Image = image.split(';base64,').pop();
    await fs.writeFile(`./controller/${name}.png`, base64Image, { encoding: 'base64' }, function (err) {
        console.log('>>> File created <<<');
    });

    //upload to cloud storage
    let storageRef = storage.bucket();
    await storageRef.upload(`./controller/${name}.png`, {
        destination: `RoomQrCode/${name}.png`,
        gzip: true,
        metadata: {
            cacheControl: 'public, max-age=31536000'
        }
    }).then(async () => {
        //delete image from project
        let path = `./controller/${name}.png`;
        await fs.unlink(path, (err) => {
            if (err) {
                console.error(err)
            }
            console.log('>>> File remove <<<')
        })
    })

    //get URL to frontend
    let file = storageRef.file(`RoomQrCode/${name}.png`);
    await file.getSignedUrl({
        action: 'read',
        expires: '03-09-2491'
    }).then(signedUrls => {
        singnedUrls = signedUrls[0];
    });

    return singnedUrls;
}

async function createRoom(datas) {
    let genRoomID = await generateRoomID();
    let CheckUserRef = await db.collection('AccountProfile').doc(datas.lineID);
    CheckUserRef.get().then(data => {
        if (data.exists) {
            let saveRoomIDinAccountRef = CheckUserRef.collection('Room').doc(genRoomID);
            saveRoomIDinAccountRef.set({
                roomID: genRoomID
            })
            let saveRoomID = db.collection('Room').doc(genRoomID)
            saveRoomID.set({
                roomID: genRoomID,
                ownerRoomID: datas.lineID,
                ownerRoomName: datas.displayName,
                ownerPicRoom: datas.pictureURL,
                roomName: datas.roomName,
                roomCover: datas.roomCover,
                province: datas.province,
                startDate: datas.startDate,
                endDate: datas.endDate,
                tripDetails: datas.tripDetails,
                qrCode: datas.qrCode,
                maxMember: datas.maxMember,
                genderCondition: datas.genderCondition,
                ageCondition: datas.ageCondition,
                roomStatus: datas.roomStatus,
                createDate: datas.createDate
            })
        }
    })
    return genRoomID;
};

async function updateRoom(datas) {
    let editRoomRef = db.collection('Room').doc(datas.roomID);
    await editRoomRef.update({
        roomName: datas.roomName,
        roomCover: datas.roomCover,
        province: datas.province,
        startDate: datas.startDate,
        endDate: datas.endDate,
        tripDetails: datas.tripDetails,
        qrCode: datas.qrCode,
        maxMember: datas.maxMember,
        genderCondition: datas.genderCondition,
        ageCondition: datas.ageCondition,
        roomStatus: datas.roomStatus
    }).then(function () {
        console.log("Room successfully update!");
    }).catch(function (error) {
        console.error("Error update document in Room: ", error);
    });
};

async function deleteRoom(datas) {
    await db.collection('AccountProfile').doc(datas.lineID).collection('Room').doc(datas.roomID).delete();

    // จะลบข้อมูลที่เกี่ยวกับ user คนนั้นออกให้หมดจาก DB
    // จะลบข้อมูลของ Member ทั้งหมดใน room 
    // await db.collection('Room').doc(datas.roomID).collection('Member').doc().delete();

    await db.collection('Room').doc(datas.roomID).delete()
        .then(function () {
            console.log("Room successfully deleted!");
        }).catch(function (error) {
            console.error("Error deleted document in Room: ", error);
        });
};

async function setRoomHistory(datas) {

};

async function queryRoom(datas) {

};

module.exports = router;
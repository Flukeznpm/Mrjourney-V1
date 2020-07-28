var express = require('express');
var router = express.Router();
var firebase = require('firebase-admin');
let db = firebase.firestore();

//---------------- Controller ----------------//
// GET /room  (แสดง room ทั้งหมดใน feed page)
// GET /roomDetail (แสดงรายละเอียดของแต่ละ room)
// POST /room/createRoom  (สร้าง room)
// PUT /room/editRoom (แก้ไขข้อมูล room)
// DELETE /room/deleteRoom  (ลบ room)

router.get('/', async function (req, res, next) {
    let RoomList = await getAllRoom();
    console.log('Room: ')
    res.status(200).json(RoomList);
});

router.get('/roomDetail', async function (req, res, next) {
    let datas = req.body;
    if (datas.roomID == undefined || datas.roomID == null || datas.roomID == '') {
        res.status(400).json({
            message: "The Data was empty or undefined"
        })
    } else {
        let roomDetail = await getRoomDetail(datas);
        res.status(200).json(roomDetail);
    }
});

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
        //datas.qrCode == undefined || datas.qrCode == null || datas.qrCode == '' ||
        datas.status == undefined || datas.status == null || datas.status == '') {
        console.log('Alert: The Data was empty or undefined"')
        return res.status(400).json({
            message: "The Data was empty or undefined"
        })
    } else {
        await createRoom(datas);
        console.log('Alert: Create Room Success')
        res.status(201).json({
            message: "Create Room Success",
        })
    }
});

router.put('/editRoom', async function (req, res, next) {
    let datas = req.body;
    if (datas.roomID == undefined || datas.roomID == null || datas.roomID == '' ||
        datas.ownerRoom == undefined || datas.ownerRoom == null || datas.ownerRoom == '' ||
        datas.lineID == undefined || datas.lineID == null || datas.lineID == '' ||
        datas.roomName == undefined || datas.roomName == null || datas.roomName == '' ||
        datas.province == undefined || datas.province == null || datas.province == '' ||
        datas.startDate == undefined || datas.startDate == null || datas.startDate == '' ||
        datas.endDate == undefined || datas.endDate == null || datas.endDate == '' ||
        datas.maxMember == undefined || datas.maxMember == null || datas.maxMember == '' ||
        datas.genderCondition == undefined || datas.genderCondition == null || datas.genderCondition == '' ||
        datas.ageCondition == undefined || datas.ageCondition == null || datas.ageCondition == '' ||
        //datas.qrCode == undefined || datas.qrCode == null || datas.qrCode == '' ||
        datas.status == undefined || datas.status == null || datas.status == '') {
        console.log('Alert: The Data was empty or undefined"')
        res.status(400).json({
            message: "The Data was empty or undefined"
        })
    } else {
        let checkPermission = await db.collection('Room').where('roomID', '==', datas.roomID).where('ownerRoomID', '==', datas.lineID)
        checkPermission.get().then(async data => {
            const checkData = data.exists;
            if (checkData) {
                await updateRoom(datas);
                console.log('Alert: Edit Room Success')
                res.status(201).json({
                    message: "Edit Room Success",
                })
            } else {
                console.log('Alert: You can not edit Room ')
                res.status(400).json({
                    message: "You can not edit Room",
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

//---------------- Function ----------------//
async function getAllRoom() {
    let RoomList = [];
    let showAllRoomRef = db.collection("Room");
    await showAllRoomRef.get().then(snapshot => {
        snapshot.forEach(doc => {
            RoomList.push(doc.data());
        });
    })
        .catch(err => {
            console.log('Error getting Room', err);
        });
    console.log(RoomList)
    return RoomList;
}

async function getRoomDetail(datas) {
    let message;
    let RoomDetail = [];
    let CheckRoomID = await db.collection('Room').doc(datas.roomID);
    CheckRoomID.get().then(async data => {
        if (data.exists) {
            message = "room ID is null"
            return message;
        } else {
            await CheckRoomID.get().then(snapshot => {
                snapshot.forEach(doc => {
                    RoomDetail.push(doc.data());
                });
            })
        }
    })
    return RoomDetail;
}

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
                if (!doc.exists) {
                    checkDocumentisEmpty = false;
                    result = 'R_' + id;
                    console.log('You can use Room ID : ' + result);
                }
            })
    } while (checkDocumentisEmpty == true)
    return result;
}

async function createRoom(datas) {
    let genRoomID = await generateRoomID();
    console.log('roomID : ' + genRoomID);

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
                // roomCover: datas.roomCover,
                province: datas.province,
                startDate: datas.startDate,
                endDate: datas.endDate,
                tripDetails: datas.tripDetails,
                // qrCode: datas.qrCode,
                maxMember: datas.maxMember,
                genderCondition: datas.genderCondition,
                ageCondition: datas.ageCondition,
                status: datas.status
            })
        } else {
            let saveUserRef = db.collection('AccountProfile').doc(datas.lineID);
            saveUserRef.set({
                lineID: datas.lineID,
                displayName: datas.displayName,
                pictureURL: data.pictureURL,
                fname: data.fname,
                lname: data.lname,
                bio: datas.bio,
                gender: datas.gender,
                birthday: datas.birthday,
                phone: datas.phone,
                rating: datas.rating
            })
            let saveRoomIDinAccountRef = saveUserRef.collection('Room').doc(genRoomID);
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
                // roomCover: datas.roomCover,
                province: datas.province,
                startDate: datas.startDate,
                endDate: datas.endDate,
                tripDetails: datas.tripDetails,
                // qrCode: datas.qrCode,
                maxMember: datas.maxMember,
                genderCondition: datas.genderCondition,
                ageCondition: datas.ageCondition,
                status: datas.status
            })
        }
    });
}

async function updateRoom(datas) {
    let editRoomRef = await db.collection('Room').doc(datas.roomID);
    editRoomRef.update({
        roomName: datas.roomName,
        // roomCover: datas.roomCover,
        province: datas.province,
        startDate: datas.startDate,
        endDate: datas.endDate,
        detail: datas.detail,
        // qrCode: datas.qrCode,
        maxuser: datas.maxuser,
        genderCondition: datas.genderCondition,
        ageCondition: datas.ageCondition,
        status: datas.status
    }).then(function () {
        console.log("Room successfully update!");
    }).catch(function (error) {
        console.error("Error update document in Room: ", error);
    });
}

async function deleteRoom(datas) {
    await db.collection('AccountProfile').doc(datas.lineID).collection('Room').doc(datas.roomID).delete();

    // จะลบข้อมูลของ Member ทั้งหมดใน room ?
    // await db.collection('Room').doc(datas.roomID).collection('Member').doc().delete();

    await db.collection('Room').doc(datas.roomID).delete()
        .then(function () {
            console.log("Room successfully deleted!");
        }).catch(function (error) {
            console.error("Error deleted document in Room: ", error);
        });
}

async function setRoomHistory(datas) {

}

async function queryRoom(datas) {

}

module.exports = router;
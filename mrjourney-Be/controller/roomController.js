var express = require('express');
var router = express.Router();
var firebase = require('firebase-admin');
var storage = firebase.storage();
let db = firebase.firestore();
var fs = require('fs');
const gcs = require('@google-cloud/storage');

// GET /room  (แสดง room ทั้งหมดใน feed page)
// GET /roomDetail (แสดงรายละเอียดของแต่ละ room)
// GET /members (แสดงรายชื่อสมาชิกใน room)
// POST /room/createRoom  (สร้าง room)
// PUT /room/editRoom (แก้ไขข้อมูล room)
// DELETE /room/deleteRoom  (ลบ room)
// POST /room/uploadRoomCoverImage (ส่งรูป RoomCover มาเก็บใน Cloud storage)
// POST /room/uploadRoomQrCodeImage (ส่งรูป RoomQrCode มาเก็บใน Cloud storage)
// POST /room/joindRoom (เก็บข้อมูล user ที่เข้ามา join room นั้นๆ)
// POST /room/leaveRoom (ลบชื่อ Member id นั้นๆที่กดออกจากห้องออก และ จำนวนคนในห้องลดลง)
// POST /room/removeMember (ลบชื่อ Member id นั้นๆที่ถูห owner room เตะออกจากห้อง และ จำนวนคนในห้องลดลง)

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
        datas.roomName == undefined || datas.roomName == null || datas.roomName == '' ||
        datas.province == undefined || datas.province == null || datas.province == '' ||
        datas.startDate == undefined || datas.startDate == null || datas.startDate == '' ||
        datas.endDate == undefined || datas.endDate == null || datas.endDate == '' ||
        datas.maxMember == undefined || datas.maxMember == null || datas.maxMember == '' ||
        datas.genderCondition == undefined || datas.genderCondition == null || datas.genderCondition == '' ||
        datas.ageCondition == undefined || datas.ageCondition == null || datas.ageCondition == '' ||
        datas.roomStatus == undefined || datas.roomStatus == null || datas.roomStatus == false ||
        datas.endDateStatus == undefined || datas.endDateStatus == null || datas.endDateStatus == true ||
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
        datas.endDateStatus == undefined || datas.endDateStatus == null) {
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
    let datas = req.query;
    if (datas.roomID == undefined || datas.roomID == null || datas.roomID == '' ||
        datas.lineID == undefined || datas.lineID == null || datas.lineID == '') {
        console.log('Alert: The Data was empty or undefined"')
        res.status(400).json({
            message: "The Data was empty or undefined"
        })
    } else {
        let checkPermission = await db.collection('Room').where('roomID', '==', datas.roomID).where('ownerRoomID', '==', datas.lineID);
        await checkPermission.get().then(async data => {
            if (data.empty) {
                console.log('You do not have permission to delete trip');
                return;
            } else {
                await deleteRoom(datas);
                console.log('Alert: Delete Room Success')
                res.status(200).json({
                    message: "Delete Room Success",
                })
            }
        })
    }
});

router.put('/closeRoom', async function (req, res, next) {
    let datasQuery = req.query;
    let roomStatus = req.body.roomStatus;
    if (datasQuery.roomID == undefined || datasQuery.roomID == null || datasQuery.roomID == '' ||
        datasQuery.lineID == undefined || datasQuery.lineID == null || datasQuery.lineID == '' ||
        roomStatus == undefined || roomStatus == null) {
        console.log('Alert: The Data was empty or undefined"')
        res.status(400).json({
            message: "The Data was empty or undefined"
        })
    } else {
        let checkPermission = await db.collection('Room').where('roomID', '==', datasQuery.roomID).where('ownerRoomID', '==', datasQuery.lineID);
        await checkPermission.get().then(async data => {
            if (data.empty) {
                console.log('You do not have permission to close room');
                return;
            } else {
                await closeRoom(datasQuery, roomStatus);
                console.log('Alert: Close Room Success')
                res.status(200).json({
                    message: "Close Room Success",
                })
            }
        })
    }
});

router.put('/openRoom', async function (req, res, next) {
    let datasQuery = req.query;
    let roomStatus = req.body.roomStatus;
    if (datasQuery.roomID == undefined || datasQuery.roomID == null || datasQuery.roomID == '' ||
        datasQuery.lineID == undefined || datasQuery.lineID == null || datasQuery.lineID == '' ||
        roomStatus == undefined || roomStatus == null) {
        console.log('Alert: The Data was empty or undefined"')
        res.status(400).json({
            message: "The Data was empty or undefined"
        })
    } else {
        let checkPermission = await db.collection('Room').where('roomID', '==', datasQuery.roomID).where('ownerRoomID', '==', datasQuery.lineID);
        await checkPermission.get().then(async data => {
            if (data.empty) {
                console.log('You do not have permission to close room');
                return;
            } else {
                await openRoom(datasQuery, roomStatus);
                console.log('Alert: Close Room Success')
                res.status(200).json({
                    message: "Close Room Success",
                })
            }
        })
    }
});

router.post('/uploadRoomCoverImage', async function (req, res, next) {
    let image = req.body.image;
    let name = req.body.nameImage;
    let imageURL = await uploadRoomCoverImageToCloudStorage(image + '', name);
    res.status(200).json(imageURL);
});

router.post('/uploadRoomQrCodeImage', async function (req, res, next) {
    let image = req.body.image;
    let name = req.body.nameImage;
    let imageURL = await uploadRoomQrCodeImageToCloudStorage(image + '', name);
    res.status(200).json(imageURL);
});

router.post('/joinRoom', async function (req, res, next) {
    let datas = req.body;
    if (datas.lineID == undefined || datas.lineID == null || datas.lineID == '' ||
        datas.fName == undefined || datas.fName == null || datas.fName == '' ||
        datas.roomID == undefined || datas.roomID == null || datas.roomID == '') {
        console.log('Alert: The Data was empty or undefined"')
        res.status(400).json({
            message: "The Data was empty or undefined"
        })
    } else {
        let checkUserRef = db.collection('AccountProfile').doc(datas.lineID);
        await checkUserRef.get().then(async data => {
            if (data.exists) {
                let checkUserJoinedRoomAlready = db.collection('Room').doc(datas.roomID).collection('Members').doc(datas.lineID);
                await checkUserJoinedRoomAlready.get().then(async doc => {
                    if (doc.exists) {
                        console.log('User have already join room');
                        res.status(200).json('User have already join room');
                    } else {
                        await joinedRoom(datas)
                            .then(() => {
                                console.log('User Joined Room Success');
                                res.status(201).json({
                                    message: "User Joined Room Success",
                                })
                            });
                    }
                });
            } else {
                console.log('User do not register on system');
                res.status(202).json('User do not have register in system, User can not join room');
            }
        });
    }
});

router.post('/leaveRoom', async function (req, res, next) {
    let datas = req.body;
    if (datas.lineID == undefined || datas.lineID == null || datas.lineID == '' ||
        datas.roomID == undefined || datas.roomID == null || datas.roomID == '') {
        console.log('Alert: The Data was empty or undefined"')
        res.status(400).json({
            message: "The Data was empty or undefined"
        })
    } else {
        await leaveRoom(datas)
            .then(() => {
                console.log('User out room Success');
                res.status(201).json({
                    message: "User out room Success",
                })
            });
    }
});

router.post('/removeMember', async function (req, res, next) {
    let datas = req.body;
    if (datas.lineID == undefined || datas.lineID == null || datas.lineID == '' ||
        datas.roomID == undefined || datas.roomID == null || datas.roomID == '' ||
        datas.userID == undefined || datas.userID == null || datas.userID == '') {
        console.log('Alert: The Data was empty or undefined"')
        res.status(400).json({
            message: "The Data was empty or undefined"
        })
    } else {
        let checkPermission = await db.collection('Room').where('roomID', '==', datas.roomID).where('ownerRoomID', '==', datas.lineID);
        await checkPermission.get().then(async data => {
            if (data.empty) {
                console.log('User do not have permission to remove user of this room');
                res.status(400).json('User do not have permission to remove user of this room');
            } else {
                await removeMember(datas);
                console.log('User out room Success');
                res.status(201).json({
                    message: "User out room Success",
                })
            }
        })
    }
});

router.get('/joinRoomAlready', async function (req, res, next) {
    let datas = req.query;
    let statusJoinedRoom = false;
    let checkUserJoinedRoomAlready = db.collection('Room').doc(datas.roomID).collection('Members').doc(datas.lineID);
    await checkUserJoinedRoomAlready.get().then(async data => {
        if (data.exists) {
            statusJoinedRoom = true;
            res.status(200).json(statusJoinedRoom);
        } else {
            res.status(200).json(statusJoinedRoom);
        }
    })
});

async function getAllRoom() {
    let RoomList = [];
    let RoomList_FINAL = [];

    let showAllRoomRef = db.collection("Room").orderBy('createDate', "desc");
    await showAllRoomRef.get().then(async snapshot => {
        snapshot.forEach(async doc => {
            await RoomList.push(doc.data());
        });
    })
        .catch(err => {
            console.log('Error getting Room', err);
        });

    let countRoomList_DESC = (RoomList.length) - 1;

    for (let i = 0; i <= countRoomList_DESC; i++) {
        let get_EndDateStatus_false = RoomList.map(end => end.endDateStatus);
        if (get_EndDateStatus_false[i] == false) {
            RoomList_FINAL.push(RoomList[i])
        }
    }

    return RoomList_FINAL;
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
                if (!doc.exists) {
                    checkDocumentisEmpty = false;
                    result = 'R_' + id;
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
    let joinedMember = 1;
    await CheckUserRef.get().then(async data => {
        if (data.exists) {
            let saveRoomIDinAccountRef = CheckUserRef.collection('Room').doc(genRoomID);
            await saveRoomIDinAccountRef.set({
                roomID: genRoomID
            })
            let saveRoomID = db.collection('Room').doc(genRoomID)
            await saveRoomID.set({
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
                endDateStatus: datas.endDateStatus,
                createDate: datas.createDate,
                joinedMember: joinedMember
            })
            let saveOwnerMembers = saveRoomID.collection('Members').doc('A');
            await saveOwnerMembers.set({
                lineID: datas.lineID,
                fName: datas.displayName,
                pictureURL: datas.pictureURL
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
        endDateStatus: datas.endDateStatus
    }).then(function () {
        console.log("Room successfully update!");
    }).catch(function (error) {
        console.error("Error update document in Room: ", error);
    });
};

async function closeRoom(datas, roomStatus) {
    let closeRoomRef = db.collection('Room').doc(datas.roomID);
    await closeRoomRef.update({
        roomStatus: roomStatus
    })
};

async function openRoom(datas, roomStatus) {
    let closeRoomRef = db.collection('Room').doc(datas.roomID);
    await closeRoomRef.update({
        roomStatus: roomStatus
    })
};

async function deleteRoom(datas) {
    // ลบข้อมูลของ Room ที่ User มี ใน AccountProfile ตาม Room ID นั้น
    await db.collection('AccountProfile').doc(datas.lineID).collection('Room').doc(datas.roomID).delete();
    // ลบ owner room 
    await db.collection('Room').doc(datas.roomID).collection('Members').doc('A').delete();
    // ลบข้อมูลของ Member ทั้งหมด ใน Room ID นั้น
    let getMemberID = [];
    const GetRoomFromAccIDRef = db.collection('Room').doc(datas.roomID).collection('Members');
    await GetRoomFromAccIDRef.get().then(async data => {
        if (data.empty) {
            console.log('No matching documents.');
            return;
        } else {
            data.forEach(f => {
                getMemberID.push(f.data());
            });
            let MemberIDArray = await getMemberID.map(r => r.lineID);
            let MemberIDCount = (MemberIDArray.length);
            for (i = MemberIDCount; i <= MemberIDCount; i--) {
                if (i > 0) {
                    let MembersID = (MemberIDArray[i - 1]);
                    let MembersIDString = MembersID.toString();
                    await db.collection('Room').doc(datas.roomID).collection('Members').doc(MembersIDString).delete();
                } else {
                    return;
                }
            }
        }
    });
    // ลบข้อมูล Room ID นั้น
    await db.collection('Room').doc(datas.roomID).delete()
        .then(function () {
            console.log("Room successfully deleted!");
        }).catch(function (error) {
            console.error("Error deleted document room: ", error);
        });
};

async function joinedRoom(datas) {
    let saveMembersJoinedRoom = db.collection('Room').doc(datas.roomID).collection('Members').doc(datas.lineID);
    await saveMembersJoinedRoom.set({
        fName: datas.fName,
        lineID: datas.lineID,
        pictureURL: datas.pictureURL
    });

    let Members = [];
    let checkAllMembersRef = db.collection('Room').doc(datas.roomID).collection('Members');
    await checkAllMembersRef.get().then(snapshot => {
        snapshot.forEach(doc => {
            Members.push(doc.data());
        });
    })

    let addMembers = (Members.length);
    let saveRoomID = db.collection('Room').doc(datas.roomID)
    await saveRoomID.update({
        joinedMember: addMembers
    })
};

async function leaveRoom(datas) {
    let deleteMembersJoinedRoom = db.collection('Room').doc(datas.roomID).collection('Members').doc(datas.lineID);
    await deleteMembersJoinedRoom.delete();

    let Members = [];
    let checkAllMembersRef = db.collection('Room').doc(datas.roomID).collection('Members');
    await checkAllMembersRef.get().then(snapshot => {
        snapshot.forEach(doc => {
            Members.push(doc.data());
        });
    })

    let addMembers = (Members.length);
    let saveRoomID = db.collection('Room').doc(datas.roomID)
    await saveRoomID.update({
        joinedMember: addMembers
    })
};

async function removeMember(datas) {
    let deleteMembersJoinedRoom = db.collection('Room').doc(datas.roomID).collection('Members').doc(datas.userID);
    await deleteMembersJoinedRoom.delete();

    let Members = [];
    let checkAllMembersRef = db.collection('Room').doc(datas.roomID).collection('Members');
    await checkAllMembersRef.get().then(snapshot => {
        snapshot.forEach(doc => {
            Members.push(doc.data());
        });
    })

    let addMembers = (Members.length);
    let saveRoomID = db.collection('Room').doc(datas.roomID)
    await saveRoomID.update({
        joinedMember: addMembers
    })
};

module.exports = router;
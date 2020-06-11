var express = require('express');
var router = express.Router();
var firebase = require('firebase-admin');

let db = firebase.firestore()

// GET /room  (แสดง room ทั้งหมดใน feed page)
router.get('/', async function (req, res, next) {
    let RoomList = await getAllRoom();
    res.status(200).json(RoomList);
});
// POST /room/createRoom  (สร้าง room)
router.post('/createRoom', async function (req, res, next) {
    await createRoom(req.body);
    res.status(201).json({
        message: "Create Room Success",
    })
});
// PUT /room/editRoom (แก้ไขข้อมูล room)
router.put('/editRoom', async function (req, res, next) {
    await updateRoom(req.body)
    res.status(201).json({
        message: "Edit Room Success",
    })
});
// DELETE /room/deleteRoom  (ลบ room)
router.delete('/deleteRoom', function (req, res, next) {
    deleteRoom(req.body)
    res.status(200).json({
        message: "Delete Room Success",
    })
});

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
                lineID: datas.lineID,
                ownerRoom: datas.displayName,
                ownerPicRoom: datas.pictureURL,
                roomName: datas.roomName,
                // picRoom: datas.picRoom,
                province: datas.province,
                startDate: datas.startDate,
                endDate: datas.endDate,
                tripDetails: datas.tripDetails,
                // QRcode: datas.QRcode,
                maxMember: datas.maxMember,
                genderCondition: datas.genderCondition,
                ageCondition: datas.ageCondition,
                status: datas.status
            })
        } else {
            let saveUserRef = db.collection('AccountProfile').doc(datas.lineID);
            saveUserRef.set({
                lineID: datas.lineID,
                displayName: datas.displayName
                // bio: datas.bio,
                // birthday: datas.birthday,
                // gender: datas.gender,
                // phone: datas.phone,
                // rating: datas.rating
            })
            let saveRoomIDinAccountRef = saveUserRef.collection('Room').doc(genRoomID);
            saveRoomIDinAccountRef.set({
                roomID: genRoomID
            })
            let saveRoomID = db.collection('Room').doc(genRoomID)
            saveRoomID.set({
                roomID: genRoomID,
                lineID: datas.lineID,
                ownerRoom: datas.displayName, 
                ownerPicRoom: datas.pictureURL,
                roomName: datas.roomName,
                // picRoom: datas.picRoom,
                province: datas.province,
                startDate: datas.startDate,
                endDate: datas.endDate,
                tripDetails: datas.tripDetails,
                // QRcode: datas.QRcode,
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
        // picRoom: datas.picRoom,
        province: datas.province,
        startDate: datas.startDate,
        endDate: datas.endDate,
        detail: datas.detail,
        // QRcode: datas.QRcode,
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
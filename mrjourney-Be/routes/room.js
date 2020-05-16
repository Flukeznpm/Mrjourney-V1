var express = require('express');
var router = express.Router();
var firebase = require('firebase-admin');
var serviceAccountKey = require('../serviceAccountKey.json')

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccountKey),
    databaseURL: "https://test-firebase-c50da.firebaseio.com"
});

let db = firebase.firestore()

// GET /room  (แสดงroomทั้งหมด)
router.get('/', function (req, res, next) {
    showRoom();
})
// POST /room/createRoom  (สร้าง room)
router.post('/createRoom', async function (req, res, next) {
    await createRoom(req.body);
    res.status(201).json({
        message: "Create Room Success",
    })
});
// PUT /room/editRoom (แก้ไขข้อมูลroom)
router.put('/editRoom', function (req, res, next) {
    editRoom(req.body)
    res.status(201).json({
        message: "Edit Room Success",
    })
});
// DELETE /room/deleteRoom  (ลบroom)
router.put('/deleteRoom', function (req, res, next) {
    deleteRoom(req.body)
    res.status(200).json({
        message: "Delete Room Success",
    })
});

//-------------------------------------------------------------------------------------------------------------//



function showRoom() {
    // วน loop แสดงข้อมูลบน Feed ??
    let RoomList = [];
    let showAllRoomRef = db.collection("Room");
    showAllRoomRef.get().then(snapshot => {
        snapshot.forEach(doc => {
            console.log(doc.data());
            RoomList.push(doc.data());
        });
    })
        .catch(err => {
            console.log('Error getting Room', err);
        });
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



function editRoom(datas) {
    let editRoom = db.collection('Room').doc(data.roomID);
    editRoom.update({
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
    await db.collection('AccountProfile').doc(datas.lineID).collection('Room').doc(datas.roomID).delete()
        .then(function () {
            console.log("RoomID in AccountProfile successfully deleted!");
        }).catch(function (error) {
            console.error("Error deleted document in AccountProfile: ", error);
        });
    await db.collection('Room').doc(datas.roomID).delete()
        .then(function () {
            console.log("Room successfully deleted!");
        }).catch(function (error) {
            console.error("Error deleted document in Room: ", error);
        });
}

module.exports = router;
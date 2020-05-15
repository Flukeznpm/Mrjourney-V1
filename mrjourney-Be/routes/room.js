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
router.post('/createRoom', function (req, res, next) {
    createRoom(req.body);
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
        });
    })
        .catch(err => {
            console.log('Error getting Room', err);
        });
    return RoomList;
}

random() = {

}

async function createRoom(datas) {
    let CheckUserRef = await db.collection('AccountProfile').doc(datas.lineID);
    CheckUserRef.get().then(data => {
        if (data.exists) {
            let saveRoomIDinAccountRef = CheckUserRef.collection('Room').doc(genRoomIDน้อยไปมาก);
            saveRoomIDinAccountRef.set({
                roomID: datas.roomID
            })
            let saveRoomID = db.collection('Room').doc(genRoomIDน้อยไปมาก)
            saveRoomID.set({
                //step1
                roomID: datas.roomID,
                roomName: datas.roomName,
                // picRoom: datas.picRoom,
                province: datas.province,
                startDate: datas.startDate,
                endDate: datas.endDate,
                tripDetails: datas.tripDetails,
                // QRcode: datas.QRcode,
                // step2
                maxMember: datas.maxMember,
                genderCondition: datas.genderCondition,
                ageCondition: datas.ageCondition,
                status: datas.status
            }).then(doc => {
                message: 'Create successfully room! : '
                return console.log(message + doc.data());
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
            let saveRoomIDinAccountRef = saveUserRef.collection('Room').doc(genRoomIDน้อยไปมาก);
            saveRoomIDinAccountRef.set({
                roomID: datas.roomID
            })
            let saveRoomID = db.collection('Room').doc(genRoomIDน้อยไปมาก)
            saveRoomID.set({
                //step1
                roomID: datas.roomID,
                roomName: datas.roomName,
                // picRoom: datas.picRoom,
                province: datas.province,
                startDate: datas.startDate,
                endDate: datas.endDate,
                detail: datas.detail,
                // QRcode: datas.QRcode,
                // step2
                maxuser: datas.maxuser,
                genderCondition: datas.genderCondition,
                ageCondition: datas.ageCondition,
                status: datas.status
            }).then(doc => {
                message: 'Create successfully room! : '
                return console.log(message + doc.data());
            })


        }
    });

    // Way 2
    // let checkUser = db.collection('AccountProfile').where('lineID', '==', datas.lineID).get().then(data => {
    //     if (!data.exists) {
    //         checkUserRef = db.collection('AccountProfile').doc()
    //         db.collection('Room').add({
    //             //step1
    //             roomName: data.roomName,
    //             picRoom: data.picRoom,
    //             province: data.province,
    //             startDate: data.startDate,
    //             endDate: data.endDate,
    //             Detail: data.Detail,
    //             QRcode: data.QRcode,
    //             // step2
    //             maxuser: data.maxuser,
    //             genderCondition: data.genderCondition,
    //             ageCondition: data.ageCondition,
    //             status: data.status
    //         });
    //     } else {

    //     }
    // })
}

function editRoom(datas) {
    let editRoom = db.collection('Room').doc(data.roomID);
    editRoom.update({
        // step1
        roomName: datas.roomName,
        picRoom: datas.picRoom,
        province: datas.province,
        startDate: datas.startDate,
        endDate: datas.endDate,
        Detail: datas.Detail,
        QRcode: datas.QRcode,
        // step2
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
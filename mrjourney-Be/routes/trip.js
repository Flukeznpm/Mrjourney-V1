var express = require('express');
var router = express.Router();
var firebase = require('firebase-admin');
var serviceAccountKey = require('../serviceAccountKey.json')

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccountKey),
    databaseURL: "https://test-firebase-c50da.firebaseio.com"
});

let db = firebase.firestore()

// GET /trip  (ดูข้อมูลทริปทั้งหมด)
router.get('/', async function (req, res, next) {
    let lineGroupID = req.query.lineGroupID;
    let lineID = req.query.lineID;
    let result = await showAllTrip(lineGroupID, lineID);
    res.status(200).json(result);
})
// GET /trip/{:id}/{:day}  (ดูข้อมูลทริปรายวัน)
router.get('/:id/:day', function (req, res, next) {
    showTripPerDay();
    res.status(200).json(data);
})
// POST /trip/createTrip   (เก็บข้อมูลทริป)
router.post('/createTrip', function (req, res, next) {
    let datas = req.data
    createTripList(datas);
    res.status(201).json({
        message: "Create Trip Success",
    })
});
// PUT /trip/editTrip  (แก้ไขข้อมูลทริป)
router.put('/editTrip', function (req, res, next) {
    editTrip(req.body)
    res.status(201).json({
        message: "Edit Trip Success",
    })
});
// DELETE /trip/deleteTrip  (ลบทริป)
router.put('/deleteTrip', function (req, res, next) {
    deleteTrip(req.body)
    res.status(200).json({
        message: "Delete Trip Success",
    })
});


//-------------------------------------------------------------------------------------------------------------//


async function showAllTrip(lineGroupID, lineID) {
    // ** สิ่งที่ติดขัด : กรณีที่ user คนอื่นๆ (ไม่ใช่เจ้าของห้อง) จะ check ยังไง ? **
    let dataList = [];
    let tripID;
    let checkGroupRef = await db.collection('LineGroup').doc(lineGroupID);
    checkGroupRef.get().then(data => {
        if (data.exists) {
            let checkUserRef = checkGroup.collection('Member').doc(lineID);
            checkUserRef.get().then(data => {
                if (!data.exists) {
                    message: 'User cannot check the Trip';
                    return message;
                } else {
                    let checkTripIDRef = db.collection('LineGroup').doc(lineGroupID);
                    checkTripIDRef.collection('Trip').get().then(doc => {
                        tripID = doc.data()
                    });

                    let showTrip = db.collection('TripList').doc(tripID);
                    showTrip.get().then(snapshot => {
                        snapshot.forEach(doc => {
                            console.log(doc.tripID, '=>', doc.data());
                            dataList.push(doc.data());
                        });
                    })
                        .catch(err => {
                            console.log('Error getting documents', err);
                        });
                }
            })
        } else {
            message: 'No Trip in the group , Please create trip.'
            return message;
        }
    })
    return dataList
}




// ** : ต้อง if else ว่าถ้าดูแบบ All trip ให้วน loop แสดงข้อมูล trip per day ทั้งหมด **
// function showTripPerDay(trip) {
//     let dataPerDay = [];
//     let checkGroup = await db.collection('').doc().where('', '==', '');
//     let checkDay = await db.collection('').doc().where('', '==', '');
//     if (!checkGroup) {
//         message: 'You do not have trip'
//         return message
//     } else if (checkGroup) {
//         if (checkDay) {
//             await db.collection('').doc('').get()
//                 .then((snapshot) => {
//                     snapshot.forEach(doc => {
//                         dataPerDay.push(doc.data())
//                     })
//                 })
//         }
//     }
//     return dataPerDay
// }




async function createTripList(datas) {

    // 0. Trip id จะมีการ Generste & จัดเรียง ยังไง ? [DO]
    // 1. check : group id นั้น มีการ create trip แล้วหรือยัง ? ถ้ามี สร้างไม่ได้ / ถ้าไม่มีสร้างได้
    // fix : ถ้ากด create trip จะได้ trip id มา

    let saveLineChatAccountRef = await db.collection('LineChatAccount').doc(datas.lineID);
    saveLineChatAccountRef.set({
        lineID: datas.lineID,
        displayName: datas.displayName,
        email: datas.email,
        pictureURL: datas.pictureURL
    })
    let saveLineGroupinLineChatAccount = await saveLineChatAccountRef.collection('Group').doc(datas.lineGroupID)
    saveLineGroupinLineChatAccount.set({
        GroupID: datas.lineGroupID
    })
    let checkTripRef = await db.collection('LineGroup').doc(datas.lineGroupID);
    checkTripRef.get().then(data => {
        if (!data.exists) {
            let saveTripIDinGroupRef = db.collection('LineGroup').doc(datas.lineGroupID);
            saveTripIDinGroupRef.set({
                lineGroupID: datas.lineGroupID,
            })
            saveTripIDinGroupRef.collection('Trip').doc(genTripIDน้อยไปมาก)
                .set({
                    // ** ต้องเก็บตาม doc uniqueKey ที่เขา Gen ให้ **
                    tripID: datas.tripID
                })
            let saveMemberRef = saveTripIDinGroupRef.collection('Member').doc(datas.lineID);
            saveMemberRef.set({
                lineID: datas.lineID
            })
            let saveTripinTriplistRef = db.collection('TripList').doc(genTripIDน้อยไปมาก);
            saveTripinTriplistRef.set({
                tripID: datas.tripID,
                tripname: datas.tripname,
                province: datas.province,
                date: datas.date,
                day: datas.day,
                status: datas.status
            }).then(doc => {
                console.log(doc.data());
            })
        } else {
            message: 'You have Trip already!'
            return message;
        }
    })
    createTripPerday(datas);
}




// function createTripPerday(datas) {
//     // ** ต้องไป check กับ frontend ว่าส่งตัวแปลอะไรมาเก็บค่าันที่ **
//     let dataTripPerDay = {
//         tripID = datas.tripID,
//         tripDate = datas.Date
//     }
//     // 1. วน loop เก็บข้อมูล
//     for (let count = 1; count <= day; count++) {
//         db.collection('TripList').doc(id).collection('TripPerDay').doc(ตามวันที่).add({
//             time: data.time,
//             location: data.location,
//             date: data.date,
//             type: data.type
//         });
//     }
// }

// function editTrip() {
//     db.collection('').update()
// }




async function deleteTrip() {
    await db.collection('TripList').doc(datas.tripID).delete()
    await db.collection('LineGroup').doc(datas.lineGroupID).collection('Trip').doc(datas.tripID).delete()
        .then(function () {
            console.log("Trip successfully deleted!");
        }).catch(function (error) {
            console.error("Error deleted document trip: ", error);
        });
}

module.exports = router;
var express = require('express');
var router = express.Router();
var firebase = require('firebase-admin');
let db = firebase.firestore()

// POST /update/syncLine (อัพเดทข้อมูลชื่อและรูปภาพของ user ตามไลน์)
// POST /update/checkUserRegister (API สำหรับเช็คว่าUserมีอยู่ในระบบหรือเปล่า และใช้ในกรณีที่Userหนีการลงทะเบียน)
// POST /update/enableTrip (เช็คอัตโนมัติว่า trip ถึงวันที่จบหรือยัง)
// POST /update/enableRoom (เช็คอัตโนมัติว่า room ถึงวันที่จบหรือยัง)

router.post('/syncLine', async function (req, res, next) {
    let datas = req.body;
    await updateProfile(datas).then(() => {
        res.status(201).json({
            message: "Sync DisplayName and PictureURL success",
        })
    })
});

router.post('/checkUserRegister', async function (req, res, next) {
    console.log('Data from fe: ', req.body);
    let lineID = req.body.lineID;
    if (lineID == undefined || lineID == null || lineID == '') {
        console.log('Alert: The Data was empty or undefined"')
        return;
    } else {
        let CheckUserRegister = await db.collection('AccountProfile').doc(lineID);
        CheckUserRegister.get().then(async datas => {
            if (datas.exists) {
                console.log('User have account in system')
                res.status(200);
            } else {
                console.log('User do not have account in system')
                res.status(202);
            }
        })
    }
});

router.post('/enableRoom', async function (req, res, next) {
    let datas = req.body;
    if (datas.roomID == undefined || datas.roomID == null || datas.roomID == '') {
        console.log('Alert: The Data was empty or undefined"')
        return;
    } else {
        let roomID = datas.roomID;
        let clostRoomRef = db.collection('Room').doc(roomID);
        await clostRoomRef.update({
            endDateStatus: true
        });
        return res.status(201).json({
            message: "You room is end"
        })
    }
});

router.post('/enableTrip', async function (req, res, next) {
    let datas = req.body;
    if (
        datas.lineGroupID == undefined || datas.lineGroupID == null || datas.lineGroupID == '') {
        console.log('Alert: The Data was empty or undefined"')
        return res.status(400);
    }
    
    const tripIDList = [];
    const checkTripIDRef = db.collection('LineGroup').doc(datas.lineGroupID).collection('Trip').where('tripStatus', '==', true);
    await checkTripIDRef.get().then(async snapshot => {
        if (snapshot.empty) {
            return res.status(202).json({
                message: "You do not have a trip"
            })
        } else {
            snapshot.forEach(doc => {
                if (doc.exists) {
                    tripIDList.push(doc.data());
                }
            });

            let tripID = tripIDList.map(t => t.tripID).toString();
            let lineGroupID = datas.lineGroupID;

            await enableTrip(lineGroupID, tripID);
            return res.status(201).json({
                message: "You trip is end"
            });
        }
    });
});

async function updateProfile(datas) {
    // >>> Sync: AccountProfile Db , Room Db <<< //
    // Update profile on AccountProfile of User //
    const updateAccRef = db.collection('AccountProfile').doc(datas.lineID);
    await updateAccRef.get().then(async data => {
        if (data.exists) {
            await updateAccRef.update({
                displayName: datas.displayName,
                pictureURL: datas.pictureURL
            })
        } else {
            console.log('No matching documents.');
            return;
        }
    });

    // Update profile on all showRoom of User //
    let getRoom = [];
    const updateRoomRef = db.collection('Room').where('ownerRoomID', '==', datas.lineID);
    await updateRoomRef.get().then(async data => {
        if (data.empty) {
            console.log('No matching documents.');
            return;
        } else {
            data.forEach(f => {
                getRoom.push(f.data());
            });

            let roomIDArray = getRoom.map(r => r.roomID);
            let roomIDCount = (roomIDArray.length) - 1;

            for (i = 0; i <= roomIDCount; i++) {
                let roomID = roomIDArray[i];
                await db.collection('Room').doc(roomID).update({
                    ownerRoomName: datas.displayName,
                    ownerPicRoom: datas.pictureURL
                });
            }
        }
    });

};

async function enableTrip(lineGroupID, tripID) {
    let closeTrip = db.collection('LineGroup').doc(lineGroupID).collection('Trip').doc(tripID);
    await closeTrip.update({
        tripStatus: false
    })
    let closeTrip2 = db.collection('TripList').doc(tripID);
    await closeTrip2.update({
        tripStatus: false
    })
}

module.exports = router;
var express = require('express');
var router = express.Router();
var firebase = require('firebase-admin');
let db = firebase.firestore()

//---------------- Controller ----------------//
// POST /update/syncLine (อัพเดทข้อมูลชื่อและรูปภาพของ user ตามไลน์)
// POST /update/checkUserRegister (API สำหรับเช็คว่าUserมีอยู่ในระบบหรือเปล่า และใช้ในกรณีที่Userหนีการลงทะเบียน)
// - อัพเดทเมื่อ user ออกจากกลุ่ม line ไป

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
})

//---------------- Function ----------------//
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
            // console.log('roomIDArray: ', roomIDArray)
            let roomIDCount = (roomIDArray.length) - 1;

            for (i = 0; i <= roomIDCount; i++) {
                let roomID = roomIDArray[i];
                // console.log('RoomID loop: ', roomID);
                await db.collection('Room').doc(roomID).update({
                    ownerRoomName: datas.displayName,
                    ownerPicRoom: datas.pictureURL
                });
            }
        }
    });

    // Update profile Members on all room of User //
    // const updateAccMembersRef = db.collection('Room').doc(datas.lineID);
    // await updateAccRef.get().then(async data => {
    //     if (data.exists) {
    //         await updateAccRef.update({
    //             displayName: datas.displayName,
    //             pictureURL: datas.pictureURL
    //         })
    //     } else {
    //         console.log('No matching documents.');
    //         return;
    //     }
    // });
};

module.exports = router;
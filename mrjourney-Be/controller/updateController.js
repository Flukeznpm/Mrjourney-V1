var express = require('express');
var router = express.Router();
var firebase = require('firebase-admin');
let db = firebase.firestore()

//---------------- Controller ----------------//
// POST /update (อัพเดททุกอย่าง)
// POST /checkUserRegister (API สำหรับเช็คว่าUserมีอยู่ในระบบหรือเปล่า และใช้ในกรณีที่Userหนีการลงทะเบียน)
// - อัพเดทข้อมูลชื่อและรูปภาพของ user
// - อัพเดทเมื่อ user ออกจากกลุ่ม line ไป
// - save lineID Displayname PictureURL 

router.post('/', async function (req, res, next) {
    let datas = req.body;
    // console.log('datas : ' , datas)
    await updateProfile(datas);
    res.status(201).json({
        message: "Update DisplayName and PictureURL success",
    })
});

router.post('/checkUserRegister', async function (req, res, next) {
    console.log('Data: ', req.body);
    let lineID = req.body.lineID;
    if (lineID == undefined || lineID == null || lineID == '') {
        console.log('Alert: The Data was empty or undefined"')
        return;
    } else {
        let CheckUserRegister = await db.collection('AccountProfile').doc(dataLine.lineID);
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
async function updateProfile(data) {
    // console.log('updateProfile Be 2 :' + data.lineID)
    // let updateRef = await db.collection('Room').where('lineID', '==', data.lineID)
    // updateRef.get().then(data => {
    //     if (data.exists) {
    //         let updateRef = db.collection('Room').where('lineID', '==', data.lineID)
    //         let update = updateRef.set({
    //             ownerRoom: data.displayName,
    //             ownerPicRoom: data.pictureURL
    //         })
    //     } else {
    //         return;
    //     }
    // })

    // let collection = db.collection('Room')
    // collection.where('lineID', '==', data.lineID).get()
    //     .then(response => {
    //         let batch = db.batch()
    //         response.docs.forEach(doc => {
    //             const docRef = db.collection('Room').doc(doc.id).where('lineID', '==', data.lineID)
    //             batch.update(docRef, {
    //                 ownerRoom: data.displayName,
    //                 ownerPicRoom: data.pictureURL
    //             })
    //         })
    //         batch.commit().then(() => {
    //             console.log('updated all documents inside')
    //         })
    //     })
}

module.exports = router;
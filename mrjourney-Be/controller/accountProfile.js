var express = require('express');
var router = express.Router();
var firebase = require('firebase-admin');
let db = firebase.firestore()

//---------------- Controller ----------------//

// GET : /accountProfile  (แสดง profile ทั้งหมด ของ user)
router.get('/', async function (req, res, next) {
    let datas = req.body;
    let showAcc = await getAccountByID(datas);
    res.status(200).json(showAcc);
});
// POST : /accountProfile/createAccountDetail  (set profile)
router.post('/createAccountDetail', async function (req, res, next) {
    let datas = req.body;
    await createAccountDetail(datas);
    res.status(201).json({
        message: "Register Profile Success",
    })
});
// POST : /accountProfile/editAccountDetail (Edit profile)
router.post('/editAccountDetail', async function (req, res, next) {
    let datas = req.body;
    await updateAccountDetail(datas);
    res.status(201).json({
        message: "Edit Profile Success",
    })
});
// GET : /accountProfile/trip (ดูทริปที่เคยสร้าง)
// GET : /accountProfile/roomJoin (ดูทริปที่เคยJoin)


//---------------- Function ----------------//

async function getAccountByID(datas) {
    let dataAcc = [];
    let showDataAcc = db.collection("AccountProfile").doc(datas.lineID);
    await showDataAcc.get().then(snapshot => {
        snapshot.forEach(doc => {
            dataAcc.push(doc.data());
        });
    })
        .catch(err => {
            console.log('Error getting Room', err);
        });
    console.log('Data Account : ' + dataAcc);
    return dataAcc;
}

async function createAccountDetail(datas) {
    await db.collection('AccountProfile').doc(datas.lineID).set({
        lineID: datas.lineID,
        displayName: datas.displayName,
        bio: datas.bio,
        birthday: datas.birthday,
        gender: datas.gender,
        phone: datas.phone,
        rating: datas.rating
    });
}

async function updateAccountDetail(data) {
    await db.collection('AccountProfile').doc(datas.lineID).update({
        lineID: datas.lineID,
        displayName: datas.displayName,
        bio: datas.bio,
        birthday: datas.birthday,
        gender: datas.gender,
        phone: datas.phone,
        rating: datas.rating
    });
}

async function getTripHistoryById(datas) {

}

async function getRoomHistoryById(datas) {

}

module.exports = router;
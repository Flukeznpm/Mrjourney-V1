var express = require('express');
var router = express.Router();
var firebase = require('firebase-admin');
let db = firebase.firestore();

//---------------- Controller ----------------//
// GET : /accountProfile  (แสดง profile ทั้งหมด ของ user)
// POST : /accountProfile/createAccountDetail  (set profile)
// POST : /accountProfile/editAccountDetail (Edit profile)
// DELETE : /accountProfile/deleteAccount  (Delete Account)
// GET : /accountProfile/trip (ดูทริปที่เคยสร้าง)
// GET : /accountProfile/roomJoin (ดูทริปที่เคยJoin)

router.get('/', async function (req, res, next) {
    let datas = req.body;
    if (datas.lineID == undefined || datas.lineID == null || datas.lineID == '') {
        res.status(400).json({
            message: "The Data was empty or undefined"
        })
    } else {
        await getAccountByID(res, datas).then(res => {
            return res
        })
    }
});

router.post('/createAccountDetail', async function (req, res, next) {
    let datas = req.body;
    if (datas.lineID == undefined || datas.lineID == null || datas.lineID == '' ||
        datas.pictureURL == undefined || datas.pictureURL == null || datas.pictureURL == '' ||
        datas.displayName == undefined || datas.displayName == null || datas.displayName == '' ||
        datas.fname == undefined || datas.fname == null || datas.fname == '' ||
        datas.lname == undefined || datas.lname == null || datas.lname == '' ||
        datas.gender == undefined || datas.gender == null || datas.gender == '' ||
        datas.birthday == undefined || datas.birthday == null || datas.birthday == '' ||
        datas.phone == undefined || datas.phone == null || datas.phone == '') {
        res.status(400).json({
            message: "The Data was empty or undefined"
        })
    } else {
        await createAccountDetail(datas).then(res => {
            return res
        })
        console.log('Alert: Register Profile Success')
        res.status(201).json({
            message: "Register Profile Success",
        })
    }
});

router.put('/editAccountDetail', async function (req, res, next) {
    let datas = req.body;
    if (datas.lineID == undefined || datas.lineID == null || datas.lineID == '' ||
        datas.pictureURL == undefined || datas.pictureURL == null || datas.pictureURL == '' ||
        datas.displayName == undefined || datas.displayName == null || datas.displayName == '' ||
        datas.fname == undefined || datas.fname == null || datas.fname == '' ||
        datas.lname == undefined || datas.lname == null || datas.lname == '' ||
        datas.gender == undefined || datas.gender == null || datas.gender == '' ||
        datas.birthday == undefined || datas.birthday == null || datas.birthday == '' ||
        datas.phone == undefined || datas.phone == null || datas.phone == '') {
        res.status(400).json({
            message: "The Data was empty or undefined"
        })
    } else {
        let CheckPermission = await db.collection('AccountProfile').where('lineID', '==', datas.lineID);
        CheckPermission.get().then(async data => {
            let checkDataExists = data.exists;
            if (checkDataExists) {
                await updateAccountDetail(datas);
                console.log('Alert: Edit Profile Success"')
                res.status(201).json({
                    message: "Edit Profile Success"
                })
            } else {
                return res.status(400).json({
                    message: "You do not have permission to update trip"
                })
            }
        })
    }
});

router.delete('/deleteAccount', async function (req, res, next) {
    let datas = req.body;
    if (datas.lineID == undefined || datas.lineID == null || datas.lineID == '') {
        console.log('Alert: The Data was empty or undefined"')
        res.status(400).json({
            message: "The Data was empty or undefined"
        })
    } else {
        let checkPermission = await db.collection('AccountProfile').doc(data.lineID);
        checkPermission.get().then(async data => {
            if (data.exists) {
                await deleteRoom(req.body);
                console.log('Alert: Delete Account Success')
                res.status(200).json({
                    message: "Delete Account Success",
                })
            } else {
                console.log('Alert: You can not delete account ')
                res.status(400).json({
                    message: "You can not delete account",
                })
            }
        })
    }
});


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
    return res.status(200).json(dataAcc);
};

async function createAccountDetail(datas) {
    await db.collection('AccountProfile').doc(datas.lineID).set({
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
    });
}

async function updateAccountDetail(data) {
    await db.collection('AccountProfile').doc(datas.lineID).update({
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
    });
}

async function deleteRoom(data){

}

async function getTripHistoryById(datas) {

}

async function getRoomHistoryById(datas) {

}

module.exports = router;
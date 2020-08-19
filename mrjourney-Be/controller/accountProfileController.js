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
// GET : /accountProfile/ownerRoom (แสดง room ที่ user เป็นเจ้าของทั้งหมด)
// GET : /accountProfile/joinRoom (แสดงรายชื่อ Room ที่ User ไปเข้าร่วมทั้วหมด)

router.get('/', async function (req, res, next) {
    let datas = req.query;
    if (datas.lineID == undefined || datas.lineID == null || datas.lineID == '') {
        res.status(400).json({
            message: "The Data was empty or undefined"
        })
    } else {
        let accList = await getAccountByID(datas);
        res.status(200).json(accList);
    }
});

router.post('/createAccountDetail', async function (req, res, next) {
    let datas = req.body;
    if (datas.lineID == undefined || datas.lineID == null || datas.lineID == '' ||
        datas.pictureURL == undefined || datas.pictureURL == null || datas.pictureURL == '' ||
        datas.displayName == undefined || datas.displayName == null || datas.displayName == '' ||
        datas.fName == undefined || datas.fName == null || datas.fName == '' ||
        datas.lName == undefined || datas.lName == null || datas.lName == '' ||
        datas.gender == undefined || datas.gender == null || datas.gender == '' ||
        datas.birthday == undefined || datas.birthday == null || datas.birthday == '' ||
        datas.tel == undefined || datas.tel == null || datas.tel == '') {
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
        datas.fName == undefined || datas.fName == null || datas.fName == '' ||
        datas.lName == undefined || datas.lName == null || datas.lName == '' ||
        datas.gender == undefined || datas.gender == null || datas.gender == '' ||
        datas.birthday == undefined || datas.birthday == null || datas.birthday == '' ||
        datas.tel == undefined || datas.tel == null || datas.tel == '') {
        res.status(400).json({
            message: "The Data was empty or undefined"
        })
    } else {
        let CheckPermission = await db.collection('AccountProfile').doc(datas.lineID);
        CheckPermission.get().then(async data => {
            if (data.exists) {
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
                await deleteAccount(req.body);
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

router.get('/ownerRoom', async function (req, res, next) {
    let datas = req.query;
    if (datas.lineID == undefined || datas.lineID == null || datas.lineID == '') {
        res.status(400).json({
            message: "The Data was empty or undefined"
        })
    } else {
        let ownerRoomList = await getOwnerRoomByID(datas);
        res.status(200).json(ownerRoomList);
    }
});

//---------------- Function ----------------//
async function getAccountByID(datas) {
    let dataAcc = [];
    let showDataAcc = db.collection("AccountProfile").doc(datas.lineID);
    await showDataAcc.get().then(doc => {
        dataAcc.push(doc.data());
    })
        .catch(err => {
            console.log('Error getting AccountPorfile', err);
        });
    return dataAcc;
};

async function createAccountDetail(datas) {
    await db.collection('AccountProfile').doc(datas.lineID).set({
        lineID: datas.lineID,
        displayName: datas.displayName,
        pictureURL: datas.pictureURL,
        fName: datas.fName,
        lName: datas.lName,
        gender: datas.gender,
        birthday: datas.birthday,
        tel: datas.tel
    });
};

async function updateAccountDetail(datas) {
    await db.collection('AccountProfile').doc(datas.lineID).update({
        lineID: datas.lineID,
        displayName: datas.displayName,
        pictureURL: datas.pictureURL,
        fName: datas.fName,
        lName: datas.lName,
        //bio: datas.bio,
        gender: datas.gender,
        birthday: datas.birthday,
        tel: datas.tel,
        //rating: datas.rating
    });
};

async function deleteAccount(datas) {
    //ลบยัน Account ID ใน 'AccountPrifile' DB
};

async function getOwnerRoomByID(datas) {
    let ownerRoomList = [];
    let showDataOwnerRoomSnapshot = db.collection("Room").where('ownerRoomID', '==', datas.lineID).get();

    if (showDataOwnerRoomSnapshot.empty) {
        console.log('No matching documents.');
        return;
    }

    showDataOwnerRoomSnapshot.forEach(doc => {
        ownerRoomList.push(doc.data());
    });

    console.log('Data snapshot: ' + ownerRoomList)

    return ownerRoomList;
};

async function getTripHistoryById(datas) {

};

async function getRoomHistoryById(datas) {

};

module.exports = router;
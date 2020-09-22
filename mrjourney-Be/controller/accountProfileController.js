var express = require('express');
var router = express.Router();
var firebase = require('firebase-admin');
const db = firebase.firestore();

//---------------- Controller ----------------//
// GET : /accountProfile  (แสดง profile ทั้งหมด ของ user)
// POST : /accountProfile/createAccountDetail  (First time login to create profile)
// PUT : /accountProfile/editAccountDetail (Edit profile)
// PUT : /accountProfile/editBio (Edit bio)
// DELETE : /accountProfile/deleteAccount  (Delete Account)
// GET : /accountProfile/trip (ดูทริปที่เคยสร้าง)
// GET : /accountProfile/roomJoin (ดูทริปที่เคยJoin)
// GET : /accountProfile/ownerRoom (แสดง room ที่ user เป็นเจ้าของทั้งหมด)
// GET : /accountProfile/joinRoom (แสดงรายชื่อ Room ที่ User ไปเข้าร่วมทั้วหมด)

router.get('/', async function (req, res, next) {
    let datas = req.query;
    if (datas.userID == undefined || datas.userID == null || datas.userID == '') {
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
        datas.birthday == undefined || datas.birthday == null || datas.birthday == '') {
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
        datas.birthday == undefined || datas.birthday == null || datas.birthday == '') {
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

router.put('/editBio', async function (req, res, next) {
    let datas = req.body;
    let CheckPermission = await db.collection('AccountProfile').doc(datas.lineID);
    CheckPermission.get().then(async data => {
        if (data.exists) {
            await updateBio(datas);
            console.log('Alert: Edit Bio Success"')
            res.status(201).json({
                message: "Edit Bio Success"
            })
        } else {
            return res.status(400).json({
                message: "You do not have permission to update Bio"
            })
        }
    })
});

router.delete('/deleteAccount', async function (req, res, next) {
    let datas = req.body;
    if (datas.lineID == undefined || datas.lineID == null || datas.lineID == '') {
        console.log('Alert: The Data was empty or undefined"')
        res.status(400).json({
            message: "The Data was empty or undefined"
        })
    } else {
        let checkPermission = db.collection('AccountProfile').doc(datas.lineID);
        await checkPermission.get().then(async data => {
            if (data.exists) {
                await deleteAccount(datas);
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
    const datas = req.query;
    if (datas.lineID == undefined || datas.lineID == null || datas.lineID == '') {
        res.status(400).json({
            message: "The Data was empty or undefined"
        })
    } else {
        const ownerRoomList = await getOwnerRoomByID(datas);
        res.status(200).json(ownerRoomList);
    }
});

//---------------- Function ----------------//
async function getAccountByID(datas) {
    let dataAcc = [];
    let showDataAcc = db.collection("AccountProfile").doc(datas.userID);
    await showDataAcc.get().then(doc => {
        dataAcc.push(doc.data());
    })
        .catch(err => {
            console.log('Error getting AccountPorfile', err);
        });
    return dataAcc;

    // let showDataAcc = db.collection("AccountProfile").where('userID', '==', datas.userID);
    // if (showDataAcc.empty) {
    //     console.log('No matching data')
    //     return;
    // } else {
    //     await showDataAcc.get().then(doc => {
    //         dataAcc.push(doc.data());
    //     })
    //         .catch(err => {
    //             console.log('Error getting AccountPorfile', err);
    //         });
    // }
    // return dataAcc;
};

async function generateUserID() {
    function ran() {
        let myRoomId = Math.floor(Math.random() * 1000000) + 1;
        return myRoomId;
    }

    let result;
    let checkDocumentisEmpty = true;

    do {
        let id = await ran();
        let CheckUserIDRef = db.collection('AccountProfile');
        let userID = 'User_' + id;
        let query = await CheckUserIDRef.where('userID', '==', userID).get()
            .then(doc => {
                // ถ้าไม่มีข้อมูลอยู่
                if (doc.empty) {
                    checkDocumentisEmpty = false;
                    result = 'User_' + id;
                    console.log('You can use User ID : ' + result);
                }
            })
    } while (checkDocumentisEmpty == true)
    return result;
};

async function createAccountDetail(datas) {
    // let genUserID = await generateUserID();
    await db.collection('AccountProfile').doc(datas.lineID).set({
        lineID: datas.lineID,
        displayName: datas.displayName,
        pictureURL: datas.pictureURL,
        fName: datas.fName,
        lName: datas.lName,
        gender: datas.gender,
        birthday: datas.birthday,
        bio: datas.bio,
        userID: datas.lineID
    });
};

async function updateAccountDetail(datas) {
    await db.collection('AccountProfile').doc(datas.lineID).update({
        lineID: datas.lineID,
        displayName: datas.displayName,
        pictureURL: datas.pictureURL,
        fName: datas.fName,
        lName: datas.lName,
        gender: datas.gender,
        birthday: datas.birthday,
        //rating: datas.rating
    });
};

async function updateBio(datas) {
    await db.collection('AccountProfile').doc(datas.lineID).update({
        bio: datas.bio
    });
};

async function deleteAccount(datas) {
    // ลบ Room ตาม AccountProfile ของ User นั้นๆ
    let getRoomID = [];
    const GetRoomFromAccIDRef = db.collection('AccountProfile').doc(datas.lineID).collection('Room');
    await GetRoomFromAccIDRef.get().then(async data => {
        if (data.empty) {
            console.log('No matching documents.');
            return;
        } else {
            data.forEach(f => {
                getRoomID.push(f.data());
            });

            let roomIDArray = getRoomID.map(r => r.roomID);
            console.log('roomIDArray: ', roomIDArray)
            let roomIDCount = (roomIDArray.length) - 1;

            for (i = 0; i <= roomIDCount; i++) {
                let roomID = roomIDArray[i];
                console.log('RoomID loop: ', roomID);
                await db.collection('AccountProfile').doc(datas.lineID).collection('Room').doc(roomID).delete();
                await db.collection('Room').doc(roomID).delete();
            }
        }
    });

    // ลบ RoomID ทั้งหมดใน AccountProfile
    // await db.collection('AccountProfile').doc(datas.lineID).collection('Room').delete();

    // ลบ AccountProfile ของ User นั้นๆ
    await db.collection('AccountProfile').doc(datas.lineID).delete()
        .then(function () {
            console.log("Account successfully deleted!");
        }).catch(function (error) {
            console.error("Error deleted document Account: ", error);
        });
};

async function getOwnerRoomByID(datas) {
    const ownerRoomList = [];
    const showDataOwnerRoomSnapshot = db.collection('Room');
    const query = showDataOwnerRoomSnapshot.where('ownerRoomID', '==', datas.lineID);
    await query.get().then(async res => {

        if (query.empty) {
            console.log('No matching documents.');
            return;
        }

        await res.forEach(async doc => {
            ownerRoomList.push(doc.data());
        });
    })
    return ownerRoomList;
};

async function getTripHistoryById(datas) {

};

async function getRoomHistoryById(datas) {

};

module.exports = router;
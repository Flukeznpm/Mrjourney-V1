var express = require('express');
var router = express.Router();
var firebase = require('firebase-admin');
const { firestore } = require('firebase-admin');
let db = firebase.firestore();

//---------------- Controller ----------------//
router.post('/createBill', async function (req, res, next) {
    let datas = req.body;
    let billNo = await createBill(datas);
    res.status(201).json(billNo);
});

router.get('/allBill', async function (req, res, next) {
    let lineGroupID = req.query.lineGroupID;
    let billNoList = [];
    let userList = [];
    let result = [];

    let getAllBill = db.collection('Bill').doc(lineGroupID).collection('BillNo');
    await getAllBill.get().then(async snapshot => {
        snapshot.forEach(doc => {
            billNoList.push(doc.data());
        });
    });
    let billNo = billNoList.map(b => b.billNo).toString();
    let ownerName = billNoList.map(o => o.ownerName).toString();
    let totalCost = billNoList.map(t => t.totalCost).toString();

    let getUser = getAllBill.doc(billNo).collection('User');
    await getUser.get().then(async snapshot => {
        await snapshot.forEach(async doc => {
            userList.push(doc.data());
        })
    });

    let returnData = {
        billNo: billNo,
        totalCost: totalCost,
        ownerName: ownerName,
        user: userList
    }
    await result.push(returnData);

    res.status(200).json(result);
});

router.post('/payBill', async function (req, res, next) {
    let lineGroupID = req.body.lineGroupID;
    let billNo = req.body.billNo;
    let userID = req.body.userID;
    let updatePayStatus = db.collection('Bill').doc(lineGroupID)
        .collection('BillNo').doc(billNo)
        .collection('User').doc(userID);
    await updatePayStatus.update({
        payStatus: false,
        waitAcceptStatus: true
    });
    res.status(201).json('Pay Success');
});

router.get('/whoWaitAccept', async function (req, res, next) {
    let lineGroupID = req.query.lineGroupID;
    let billNo = req.query.billNo;
    let UserHaveWaitingAccept = [];

    let getUserHaveWaitingAccept = db.collection('Bill').doc(lineGroupID)
        .collection('BillNo').doc(billNo)
        .collection('User').where('waitAcceptStatus', '==', true).where('payStatus', '==', false);
    await getUserHaveWaitingAccept.get().then(async snapshot => {
        snapshot.forEach(doc => {
            UserHaveWaitingAccept.push(doc.data());
        });
    });
    res.status(200).json(UserHaveWaitingAccept);
});

router.post('/acceptBill', async function (req, res, next) {
    let lineGroupID = req.body.lineGroupID;
    let billNo = req.body.billNo;
    let userID = req.body.userID;
    let updatePayStatus = db.collection('Bill').doc(lineGroupID)
        .collection('BillNo').doc(billNo)
        .collection('User').doc(userID);
    await updatePayStatus.update({
        payStatus: true,
        waitAcceptStatus: false
    });
    res.status(201).json('Accept Success');
});

router.get('/whoPaidOrNot', async function (req, res, next) {
    let lineGroupID = req.query.lineGroupID;
    let billNo = req.query.billNo;
    let UserPaidOrNot = [];

    let getUserHaveWaitingAccept = db.collection('Bill').doc(lineGroupID)
        .collection('BillNo').doc(billNo)
        .collection('User').where('payStatus', '==', true);
    await getUserHaveWaitingAccept.get().then(async snapshot => {
        snapshot.forEach(doc => {
            UserPaidOrNot.push(doc.data());
        });
    });
    res.status(200).json(UserPaidOrNot);
});

router.delete('/deleteBill', async function (req, res, next) {
    let lineGroupID = req.query.lineGroupID;
    let billNo = req.query.billNo;
    let getUser = [];

    let getUserIDRef = db.collection('Bill').doc(lineGroupID)
        .collection('BillNo').doc(billNo)
        .collection('User');

    await getUserIDRef.get().then(async data => {
        if (data.empty) {
            console.log('No matching documents.');
            return;
        } else {
            data.forEach(async f => {
                await getUser.push(f.id);
            });
            console.log('getDate: ', getUser)

            let userCount = (getUser.length);
            // console.log('userCount: ', DateCount)

            for (i = userCount; i <= userCount; i--) {
                if (i > 0) {
                    let userID = (getUser[i - 1]);
                    let userIDString = userID.toString();
                    // console.log('userIDString loop: ', DateIDString);
                    await getUserIDRef.doc(userIDString).delete();
                } else {
                    return;
                }
            }
        }
    });

    await db.collection('Bill').doc(lineGroupID).collection('BillNo').doc(billNo).delete();
    await db.collection('Bill').doc(lineGroupID).delete()
        .then(() => {
            res.status(200).json('Delete Bill Success !!');
        })
});

//---------------- Function ----------------//
async function generateBillID(lineGroupID) {
    function ran() {
        let myBillId = Math.floor(Math.random() * 1000000) + 1;
        return myBillId;
    }

    let result;
    let checkDocumentisEmpty = true;

    do {
        let id = await ran();
        let CheckRoomIDRef = db.collection('Bill').doc(lineGroupID).collection('BillNo');
        let billID = 'B_' + id;
        let query = await CheckRoomIDRef.doc(billID).get()
            .then(doc => {
                if (!doc.exists) {
                    checkDocumentisEmpty = false;
                    result = 'B_' + id;
                    // console.log('You can use Bill ID : ' + result);
                }
            })
    } while (checkDocumentisEmpty == true)
    return result;
};

async function generateUserID(lineGroupID, genBillID) {
    function ran() {
        let myBillId = Math.floor(Math.random() * 1000000) + 1;
        return myBillId;
    }

    let result;
    let checkDocumentisEmpty = true;

    do {
        let id = await ran();
        let CheckRoomIDRef = db.collection('Bill').doc(lineGroupID).collection('BillNo').doc(genBillID).collection('User');
        let billID = 'U_' + id;
        let query = await CheckRoomIDRef.doc(billID).get()
            .then(doc => {
                if (!doc.exists) {
                    checkDocumentisEmpty = false;
                    result = 'U_' + id;
                    // console.log('You can use Bill ID : ' + result);
                }
            })
    } while (checkDocumentisEmpty == true)
    return result;
};

async function createBill(datas) {
    let lineGroupID = datas.lineGroupID;
    let genBillID = await generateBillID(lineGroupID);

    let ownerBillID = datas.ownerBillID;
    let ownerName = datas.ownerName;
    let totalCost = datas.totalCost;

    let receivingAccount = datas.receivingAccount; //ชื่อบัญชี
    let payMentNumber = datas.payMentNumber; //เลขบัญชี
    let bankName = datas.bankName; // ชื่อธนาคารหรือพร้อมเพย์
    let user = datas.user; // รายชื่อคนที่ต้องจ่าย 
    // let paymentType = datas.paymentType;
    // let accountNumber = datas.accountNumber;

    let createBill_step1 = db.collection('Bill').doc(lineGroupID);
    await createBill_step1.set({
        lineGroupID: lineGroupID
    });

    let createBill_step2 = db.collection('Bill').doc(lineGroupID).collection('BillNo').doc(genBillID);
    await createBill_step2.set({
        totalCost: totalCost,
        ownerBillID: ownerBillID,
        ownerName: ownerName,
        receivingAccount: receivingAccount,
        payMentNumber: payMentNumber,
        bankName: bankName,
        // paymentType: paymentType,
        // accountNumber: accountNumber
    });

    // for (let i = 0; i <= 0; i++) {
    let count = (user.length) - 1;
    for (let j = 0; j <= count; j++) {
        if (j <= count) {
            // let userr = user[j].lineID + '';
            let genUserID = await generateUserID(lineGroupID, genBillID);
            let fName = user[j].fName + '';
            // console.log('date: ', date)
            // let userrSub = userr.substring(0, 10);
            // console.log('dateSub: ', dateSub)
            // let event = await user[j].event;
            // let eventName = await datas.totalDate[j].event[i].eventName;
            // let startEvent = await datas.totalDate[j].event[i].startEvent;
            // let endEvent = await datas.totalDate[j].event[i].endEvent;
            // let eventType = await datas.totalDate[j].event[i].eventType;
            await db.collection('Bill').doc(lineGroupID).collection('BillNo').doc(genBillID).collection('User').doc(genUserID).set({
                userID: genUserID,
                fName: fName,
                payStatus: false,
                waitAcceptStatus: false
            });
        } else {
            console.log('Error create bill')
        }
    }
    // }
    return genBillID;
}

module.exports = router;
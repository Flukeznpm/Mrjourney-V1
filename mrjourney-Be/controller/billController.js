var express = require('express');
var router = express.Router();
var firebase = require('firebase-admin');
const { firestore } = require('firebase-admin');
let db = firebase.firestore();

//---------------- Controller ----------------//
router.post('/createBill', async function (req, res, next) {
    let datas = req.body;
    let billNo = await createBill(datas).then(() => {
        res.status(201).json(billNo);
    })
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
        userList: userList
    }
    await result.push(returnData);

    return result
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
    return UserHaveWaitingAccept;
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
    return UserPaidOrNot;
});

router.delete('/deleteBill', async function (req, res, next) {
    let lineGroupID = req.query.lineGroupID;
    let billNo = req.query.billNo;

    //--> GET user ออกม่ทั้งหมด แล้ววน loop ลบทีละคน
    let deleteRef = db.collection('Bill').doc(lineGroupID)
        .collection('BillNo').doc(billNo)
        .collection('User').doc(fName);

    //--> ลบ BillNo ของ BillID นั้นๆ



    //--> ลบ lineGroupID นั้น



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
    let receivingAccount = datas.receivingAccount;
    let paymentType = datas.paymentType;
    let promptPayNumber = datas.promptPayNumber;
    let bankName = datas.bankName;
    let accountNumber = datas.accountNumber;
    let user = datas.user;

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
        paymentType: paymentType,
        promptPayNumber: promptPayNumber,
        bankName: bankName,
        accountNumber: accountNumber
    });

    // for (let i = 0; i <= 0; i++) {
    let count = (user.length) - 1;
    for (let j = 0; j <= count; j++) {
        if (j <= count) {
            // let userr = user[j].lineID + '';
            let genUserID = await generateUserID(lineGroupID, genUserID);
            let fname = user[j].fname + '';
            // console.log('date: ', date)
            // let userrSub = userr.substring(0, 10);
            // console.log('dateSub: ', dateSub)
            // let event = await user[j].event;
            // let eventName = await datas.totalDate[j].event[i].eventName;
            // let startEvent = await datas.totalDate[j].event[i].startEvent;
            // let endEvent = await datas.totalDate[j].event[i].endEvent;
            // let eventType = await datas.totalDate[j].event[i].eventType;
            await createBill_step2.collection('User').doc(genUserID).set({
                userID: genUserID,
                fname: fname,
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
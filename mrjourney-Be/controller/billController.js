var express = require('express');
var router = express.Router();
var firebase = require('firebase-admin');
const { firestore } = require('firebase-admin');
let db = firebase.firestore();

//---------------- Controller ----------------//

router.get('/', async function (req, res, next) {

});

router.post('/createBill', async function (req, res, next) {
    let datas = req.body;
    await createBill(datas).then(() => {
        res.status(201).json('Create Bill Success');
    })
});

router.post('/acceptBill', async function (req, res, next) {

});

router.post('/payBill', async function (req, res, next) {

});

router.put('/editBill', async function (req, res, next) {

});

router.delete('/deleteBill', async function (req, res, next) {

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

async function createBill(datas) {
    let lineGroupID = datas.lineGroupID;
    let genBillID = await generateBillID(lineGroupID);
    let ownerBill = datas.ownerBill;
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
        ownerBill: ownerBill,
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
            let userr = user[j].lineID + '';
            // console.log('date: ', date)
            // let userrSub = userr.substring(0, 10);
            // console.log('dateSub: ', dateSub)
            // let event = await user[j].event;
            // let eventName = await datas.totalDate[j].event[i].eventName;
            // let startEvent = await datas.totalDate[j].event[i].startEvent;
            // let endEvent = await datas.totalDate[j].event[i].endEvent;
            // let eventType = await datas.totalDate[j].event[i].eventType;
            await createBill_step2.collection('User').doc(userr).set({
                lineID: userr,
                payStatus: false,
                waitAcceptStatus: false
            });
        } else {
            console.log('Error create bill')
        }
    }
    // }

}

module.exports = router;
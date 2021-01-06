var express = require('express');
var router = express.Router();
var firebase = require('firebase-admin');
const { firestore } = require('firebase-admin');
let db = firebase.firestore();

router.post('/createBill', async function (req, res, next) {
    let datas = req.body;
    let billNo = await createBill(datas);
    res.status(201).json(billNo);
});

router.get('/allBill', async function (req, res, next) {
    let lineGroupID = req.query.lineGroupID;
    let billNoList = [];
    let billIDList = [];
    let userList = [];
    let result = [];

    let checkBill = db.collection('Bill').doc(lineGroupID);
    await checkBill.get().then(async doc => {
        if (doc.exists) {
            let getAllBill = db.collection('Bill').doc(lineGroupID).collection('BillNo');
            await getAllBill.get().then(async snapshot => {
                snapshot.forEach(doc => {
                    billNoList.push(doc.data());
                    billIDList.push(doc.id);
                });
            });

            let billNo = billIDList.toString();
            let ownerName = billNoList.map(o => o.ownerName).toString();
            let totalCost = billNoList.map(t => t.totalCost).toString();
            let ownerBillID = billNoList.map(t => t.ownerBillID).toString();
            let receivingAccount = billNoList.map(t => t.receivingAccount).toString();
            let bankName = billNoList.map(t => t.bankName).toString();
            let payMentNumber = billNoList.map(t => t.payMentNumber).toString();
            let billName = billNoList.map(t => t.billName).toString();

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
                ownerBillID: ownerBillID,
                receivingAccount: receivingAccount,
                bankName: bankName,
                payMentNumber: payMentNumber,
                billName: billName,
                user: userList
            }
            await result.push(returnData);
            res.status(200).json(result);
        } else {
            res.status(202).json('You do not have a bill');
        }
    });
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

router.post('/cancleAcceptBill', async function (req, res, next) {
    let lineGroupID = req.body.lineGroupID;
    let billNo = req.body.billNo;
    let userID = req.body.userID;
    let updatePayStatus = db.collection('Bill').doc(lineGroupID)
        .collection('BillNo').doc(billNo)
        .collection('User').doc(userID);
    await updatePayStatus.update({
        payStatus: false,
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
            let userCount = (getUser.length);
            for (i = userCount; i <= userCount; i--) {
                if (i > 0) {
                    let userID = (getUser[i - 1]);
                    let userIDString = userID.toString();
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

router.get('/checkBill', async function (req, res, next) {
    let lineGroupID = req.query.lineGroupID;
    let getUserIDRef = db.collection('Bill').doc(lineGroupID);
    await getUserIDRef.get().then(doc => {
        if (doc.exists) {
            res.status(201).json('You have a bill already');
        } else {
            res.status(202).json('You do not have a bill');
        }
    })
});

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
    let billName = datas.billName;
    let receivingAccount = datas.receivingAccount;
    let payMentNumber = datas.payMentNumber;
    let bankName = datas.bankName;
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
        payMentNumber: payMentNumber,
        bankName: bankName,
        billName: billName
    });

    let count = (user.length) - 1;
    for (let j = 0; j <= count; j++) {
        if (j <= count) {
            let genUserID = await generateUserID(lineGroupID, genBillID);
            let fName = user[j].fName + '';
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
    return genBillID;
}

async function getBill(lineGroupID) {
    let billNoList = [];
    let billIDList = [];
    let userList = [];
    let result = [];

    let checkBill = db.collection('Bill').doc(lineGroupID);
    await checkBill.get().then(async doc => {
        if (doc.exists) {
            let getAllBill = db.collection('Bill').doc(lineGroupID).collection('BillNo');
            await getAllBill.get().then(async snapshot => {
                snapshot.forEach(doc => {
                    billNoList.push(doc.data());
                    billIDList.push(doc.id);
                });
            });

            let billNo = billIDList.toString();
            let ownerName = billNoList.map(o => o.ownerName).toString();
            let totalCost = billNoList.map(t => t.totalCost).toString();
            let ownerBillID = billNoList.map(t => t.ownerBillID).toString();
            let receivingAccount = billNoList.map(t => t.receivingAccount).toString();
            let bankName = billNoList.map(t => t.bankName).toString();
            let payMentNumber = billNoList.map(t => t.payMentNumber).toString();
            let billName = billNoList.map(t => t.billName).toString();

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
                ownerBillID: ownerBillID,
                receivingAccount: receivingAccount,
                bankName: bankName,
                payMentNumber: payMentNumber,
                billName: billName,
                user: userList
            }
            await result.push(returnData);
            res.status(200).json(result);
        } else {
            res.status(202).json('You do not have a bill');
        }
    });
}

async function payBill(lineGroupID, billNo, userID) {
    let updatePayStatus = db.collection('Bill').doc(lineGroupID)
        .collection('BillNo').doc(billNo)
        .collection('User').doc(userID);
    await updatePayStatus.update({
        payStatus: false,
        waitAcceptStatus: true
    });
}

async function acceptBill(lineGroupID, billNo, userID) {
    let updatePayStatus = db.collection('Bill').doc(lineGroupID)
        .collection('BillNo').doc(billNo)
        .collection('User').doc(userID);
    await updatePayStatus.update({
        payStatus: true,
        waitAcceptStatus: false
    });
}

async function cancleAcceptBill(lineGroupID, billNo, userID) {
    let updatePayStatus = db.collection('Bill').doc(lineGroupID)
        .collection('BillNo').doc(billNo)
        .collection('User').doc(userID);
    await updatePayStatus.update({
        payStatus: false,
        waitAcceptStatus: false
    });
}

async function deleteBill(lineGroupID, billNo) {
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
            let userCount = (getUser.length);
            for (i = userCount; i <= userCount; i--) {
                if (i > 0) {
                    let userID = (getUser[i - 1]);
                    let userIDString = userID.toString();
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
}

async function whoWaitAccept(lineGroupID, billNo) {
    let UserHaveWaitingAccept = [];

    let getUserHaveWaitingAccept = db.collection('Bill').doc(lineGroupID)
        .collection('BillNo').doc(billNo)
        .collection('User').where('waitAcceptStatus', '==', true).where('payStatus', '==', false);
    await getUserHaveWaitingAccept.get().then(async snapshot => {
        snapshot.forEach(doc => {
            UserHaveWaitingAccept.push(doc.data());
        });
    });
}

async function whoPaidOrNot(lineGroupID, billNo) {
    let UserPaidOrNot = [];

    let getUserHaveWaitingAccept = db.collection('Bill').doc(lineGroupID)
        .collection('BillNo').doc(billNo)
        .collection('User').where('payStatus', '==', true);
    await getUserHaveWaitingAccept.get().then(async snapshot => {
        snapshot.forEach(doc => {
            UserPaidOrNot.push(doc.data());
        });
    });
}

module.exports = router;
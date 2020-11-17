var express = require('express');
var firebase = require('firebase-admin');
const { firestore } = require('firebase-admin');
let db = firebase.firestore();

async function checkTripAvaliable(data) {
    let status = false;
    const checkTripIDRef = db.collection('LineGroup').doc(data).collection('Trip').where('tripStatus', '==', true);
    await checkTripIDRef.get().then(async snapshot => {
        if (snapshot.empty) {
            status = false;
        } else {
            status = true;
        }
    })
    return status;
};

async function checkOwnerTrip(groupId, userId) {
    let status = false;
    let checkTripRef = await getLastTrip(groupId);
    let tripID = checkTripRef.map(e => e.tripID)
    let toStringID = tripID.toString()

    let checkUserRef = db.collection('TripList').where('tripID', '==', toStringID).where('ownerTrip', '==', userId);
    await checkUserRef.get().then(async doc => {
        if (doc.empty) {
            status = false;
        } else {
            let checkAccRef = db.collection('AccountProfile').doc(userId);
            await checkAccRef.get().then(async snapshot => {
                if (snapshot.exists) {
                    status = true;
                } else {
                    status = false;
                }
            })
        }
    });
    return status;
};

async function getLastTrip(lineGroupID) {
    let list = [];
    let listResult = [];
    let resultRef = db.collection('LineGroup').doc(lineGroupID).collection('Trip').orderBy('createDate', 'desc');
    await resultRef.get().then(async snapshot => {
        snapshot.forEach(async doc => {
            list.push(doc.data());
        });
    });
    let tripID = list.map(t => t.tripID);
    let tripIDString = tripID[0].toString();

    let result = db.collection('TripList').doc(tripIDString);
    await result.get().then(doc => {
        listResult.push(doc.data());
    });
    return listResult;
}

async function RecommendEat(province) {
    let provinceRef = await getLocationEat(province);
    let placeID = provinceRef.result.map(e => e.place_id)
    let toStringPlaceID = placeID[0].toString()
    return toStringPlaceID;
};

async function getLocationEat(province) {
    let dataList = [];
    const https = require('https')
    const options = {
        hostname: 'tatapi.tourismthailand.org',
        port: 443,
        path: `/tatapi/v5/places/search?categorycodes=RESTAURANT&provincename=${province}&numberofresult=5`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json, text/json',
            'Authorization': 'Bearer G6PJYs30zPWoS0O3tAWzXTIUa4OnayhOu7J2CxyY3Dfdsh0vOMjd)S)nxCBEs1OxwZGITATS6RmMQb31o2HLyh0=====2',
            'Accept-Language': 'TH'
        }
    }
    const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)
        res.on('data', d => {
            // dataList.push(d.data());
            d.data()
        })
    })
    req.on('error', error => {
        console.error(error)
    })
    req.end();

    let data = req;
    return data;
};

async function checkPayBill(lineGroupID) {
    let billRef = await getBill(lineGroupID);
    let billResult = billRef[0]
    return billResult;
};

async function getBill(lineGroupID) {
    let billNoList = [];
    let billIDList = [];
    let userList = [];
    let result = [];

    let checkBill = db.collection('Bill').doc(lineGroupID);
    await checkBill.get().then(async doc => {
        console.log('1');
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
            console.log('res', result);
        }
    });
    console.log('res', result);
    return result
}

async function checkTripPerDay(lineGroupID) {
    let currentDate = new Date();
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(currentDate);
    const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(currentDate);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(currentDate);
    let date = `${ye}-${mo}-${da}`
    let perDayRef = await getTripPerDayByDate(lineGroupID, date);
    let perDayResult = perDayRef[0]
    return perDayResult;
};

async function getTripPerDayByDate(lineGroupID, dateOfTrip) {
    let data_TripList_TripPerDay = [];
    let dataTripList = [];
    const dataTripPerDay = [];
    const tripIDList = [];
    const checkTripIDRef = db.collection('LineGroup').doc(lineGroupID).collection('Trip').where('tripStatus', '==', true);

    await checkTripIDRef.get().then(async snapshot => {
        await snapshot.forEach(doc => {
            tripIDList.push(doc.data());
        });

        let tripID = tripIDList.map(t => t.tripID).toString();
        let getAllTrip = db.collection('TripList').doc(tripID);
        await getAllTrip.get().then(async doc1 => {
            await dataTripList.push(doc1.data());
            let ownerTrip = dataTripList.map(ow => ow.ownerTrip).toString();
            let tripId = dataTripList.map(tid => tid.tripID).toString();
            let tripName = dataTripList.map(tn => tn.tripName).toString();
            let province = dataTripList.map(p => p.province).toString();
            let startDate = dataTripList.map(sd => sd.startDate).toString();
            let endDate = dataTripList.map(ed => ed.endDate).toString();
            let tripStatus = dataTripList.map(ts => ts.tripStatus).toString();

            const showTripPerDay = db.collection('TripPerDay');
            const queryTPD = showTripPerDay.doc(tripID).collection('Date').doc(dateOfTrip);
            await queryTPD.get().then(async doc => {
                await dataTripPerDay.push((doc.data()));
                let dataAll = {
                    ownerTrip: ownerTrip,
                    tripID: tripId,
                    tripName: tripName,
                    province: province,
                    startDate: startDate,
                    endDate: endDate,
                    tripStatus: tripStatus,
                    totalDate: dataTripPerDay
                }
                data_TripList_TripPerDay.push(dataAll);
            });
        })
            .catch(err => {
                console.log('Error getting All Trip detail', err);
            });
    })
    return data_TripList_TripPerDay;
};



async function getWeather(province) {
    let currentDate = new Date();
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(currentDate);
    const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(currentDate);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(currentDate);
    let date = `${ye}-${mo}-${da}-${province}`

    return date;
};


module.exports = { checkTripAvaliable, checkOwnerTrip, RecommendEat, getWeather, checkPayBill, checkTripPerDay };
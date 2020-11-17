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

    // let checkStatus = checkTripRef.map(e => e.tripStatus)
    // if (checkStatus) {
    //     status = false;
    // } else {
    // }
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
    // console.log('result: ', list[0]);
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

    let data = req ;
    return data;
};

async function getWeather(province) {
    let currentDate = new Date();
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(currentDate);
    const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(currentDate);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(currentDate);
    let date = `${ye}-${mo}-${da}-${province}`

    return date;
};

module.exports = { checkTripAvaliable, checkOwnerTrip, RecommendEat, getWeather };
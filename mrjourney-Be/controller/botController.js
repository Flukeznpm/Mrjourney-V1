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

    let checkStatus = checkTripRef.map(e => e.tripStatus)
    if (checkStatus) {
        status = false;
    } else {
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
    }
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

async function getLocation(data) {

};

async function getWeather(data) {

};

module.exports = { checkTripAvaliable, checkOwnerTrip };
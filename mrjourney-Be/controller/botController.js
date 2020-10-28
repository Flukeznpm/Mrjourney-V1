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

async function getLocation(data) {

};

async function getWeather(data) {

};

module.exports = { checkTripAvaliable };
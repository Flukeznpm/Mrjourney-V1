var express = require('express');
var router = express.Router();
var firebase = require('firebase-admin');
var serviceAccountKey = require('../serviceAccountKey.json')

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccountKey),
    databaseURL: "https://test-firebase-c50da.firebaseio.com"
});

let db = firebase.firestore()

// GET /profile  (แสดง profile ทั้งหมด ของ user)
router.get('/', function (req, res, next) {

})

// PUT /profile/editProfile  (อัพเดท profile)
router.post('/editProfile', function (req, res, next) {
    editProfile();
    res.status(201).json({
        message: "Edit Profile Success",
    })
});
// GET /profile/trip (ดูทริปที่เคยสร้าง)

// GET /profile/roomJoin (ดูทริปที่เคยJoin)

//-------------------------------------------------------------------------------------------------------------//

function editProfile(data) {
    db.collection('').add({
        birthday: data.birthday,
        gender: data.gender,
        bio: data.bio,
        rating: data.rating,
        phone: data.phone
    });
}

module.exports = router;
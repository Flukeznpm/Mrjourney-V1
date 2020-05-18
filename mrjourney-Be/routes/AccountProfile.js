var express = require('express');
var router = express.Router();
var firebase = require('firebase-admin');

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
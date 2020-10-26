var express = require('express');
var router = express.Router();
var firebase = require('firebase-admin');
const { firestore } = require('firebase-admin');
let db = firebase.firestore();

//---------------- Controller ----------------//

router.get('/', async function (req, res, next) {
});

router.post('/', async function (req, res, next) {
});

//---------------- Function ----------------//


module.exports = router;
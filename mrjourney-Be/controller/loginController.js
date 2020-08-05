var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var https = require('https');
const jwt = require('jsonwebtoken');
var firebase = require('firebase-admin');
let db = firebase.firestore();

router.post("/", async function (req, resp) {
    var data = querystring.stringify({
        grant_type: "authorization_code",
        code: req.body.code,
        redirect_uri: "http://localhost:3000/Home",
        client_id: "1653975470",
        client_secret: "8e0c61280e1b6b2ab2117d68f4a99793"
    })
    const options = {
        hostname: 'api.line.me',
        path: '/oauth2/v2.1/token',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    }
    const request = https.request(options, res => {
        //console.log(`statusCode: ${res.statusCode}`)
        res.on('data', async d => {
            process.stdout.write(d)
            data = JSON.parse(d)
            var decoded = jwt.decode(data.id_token);
            var dataLine = {
                lineID: decoded.sub,
                displayName: decoded.name,
                pictureURL: decoded.picture
            }
            // Check first login or not
            if (dataLine.lineID != null || dataLine.lineID != undefined ||
                dataLine.displayName != null || dataLine.displayName != undefined ||
                dataLine.pictureURL != null || dataLine.pictureURL != undefined) {
                console.log('check: ', dataLine.lineID)
                let CheckUserRegister = await db.collection('AccountProfile').doc(dataLine.lineID);
                CheckUserRegister.get().then(async datas => {
                    if (datas.exists) {
                        console.log('User register already')
                        var token = jwt.sign(dataLine, 'secreatKey');
                        resp.status(200).json(token);
                    } else {
                        console.log('User first login')
                        var token = jwt.sign(dataLine, 'secreatKey');
                        resp.status(202).json(token)
                    }
                })
            } else {
                resp.status(400).json({
                    message: 'Error to Authorization'
                })
            }
        })
    })
    request.on('error', error => {
        console.error(error)
    })
    request.write(data)
    request.end()
});

module.exports = router;
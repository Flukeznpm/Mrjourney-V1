var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var https = require('https');
const jwt = require('jsonwebtoken');

router.post("/", function (req, resp) {
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
        console.log(`statusCode: ${res.statusCode}`)
        res.on('data', d => {
            process.stdout.write(d)
            data = JSON.parse(d)
            // JWT Decode
            var decoded = jwt.decode(data.id_token);
            var dataLine = {
                lineID: decoded.sub,
                displayName: decoded.name,
                email: decoded.email,
                pictureURL: decoded.picture
            }
            console.log('Data after Decode : ' + dataLine)
            var token = jwt.sign(dataLine, 'secreatKey');
            resp.json(token)
        })
    })
    request.on('error', error => {
        console.error(error)
    })
    request.write(data)
    request.end()
})

module.exports = router;
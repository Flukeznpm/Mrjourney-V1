var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var app = express();
var cors = require('cors')
var firebase = require('firebase-admin');
var serviceAccountKey = require('./serviceAccountKey.json')

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccountKey),
    databaseURL: "https://test-firebase-c50da.firebaseio.com"
});

var loginRouter = require('./controller/loginController');
var accountProfileRouter = require('./controller/accountProfileController');
var tripRouter = require('./controller/tripController');
var roomRouter = require('./controller/roomController');
var updateRouter = require('./controller/updateController');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use("/getToken", loginRouter);
app.use("/update", updateRouter);
app.use("/accountProfile", accountProfileRouter);
app.use("/trip", tripRouter);
app.use("/room", roomRouter);

app.listen(process.env.PORT || 5000, () => {
    console.log(`server is listening to port ${process.env.PORT || 5000}...`);
});


 
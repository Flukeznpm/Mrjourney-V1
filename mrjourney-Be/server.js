var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var app = express();
var cors = require('cors')

var loginRouter = require('./routes/login');
// var profileRouter = require('./routes/AccountProfile');
// var tripRouter = require('./routes/trip');
var roomRouter = require('./routes/room');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use("/getToken", loginRouter);
// app.use("/profile", profileRouter);
// app.use("/trip", tripRouter);
app.use("/room", roomRouter);

app.listen(process.env.PORT || 5000, () => {
    console.log(`server is listening to ${process.env.PORT || 5000}...`);
});



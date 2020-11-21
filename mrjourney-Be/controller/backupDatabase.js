var express = require('express');
var router = express.Router();
var firebase = require('firebase-admin');
const { firestore } = require('firebase-admin');
let db = firebase.firestore();

router.post('/db', async function (req, res, next) {

    // AccountProfile
    let AccountProfile_Ref = db.collection('AccountProfile').doc('LineID');
    await AccountProfile_Ref.set({
        lineID: "lineID",
        displayName: "displayName",
        pictureURL: "pictureURL",
        fName: "fName",
        lName: "lName",
        gender: "gender",
        birthday: "birthday",
        bio: "bio"
    });

    let AccountProfile_Room_Ref = AccountProfile_Ref.collection('Room').doc('RoomID');
    await AccountProfile_Room_Ref.set({
        RoomID: "RoomID"
    });

    let AccountProfile_Score_Ref = AccountProfile_Ref.collection('Score').doc('OwnerTrip');
    await AccountProfile_Score_Ref.set({
        countOfSubmit: 0,
        entertainmentScore: 0,
        preparationScore: 0,
        worthinessScore: 0
    });

    // Room
    let Room_Ref = db.collection('Room').doc('RoomID');
    await Room_Ref.set({
        ageCondition: "ageCondition",
        createDate: "createDate",
        endDate: "endDate",
        endDateStatus: true,
        genderCondition: "genderCondition",
        joinedMember: "joinedMember",
        maxMember: "maxMember",
        ownerPicRoom: "ownerPicRoom",
        ownerRoomID: "ownerRoomID",
        ownerRoomName: "ownerRoomName",
        province: "province",
        qrCode: "qrCode",
        roomCover: "roomCover",
        roomID: "roomID",
        roomName: "roomName",
        roomStatus: true,
        startDate: "startDate",
        tripDetails: "tripDetails"
    });

    let Room_Members_Ref = Room_Ref.collection('Members').doc('UserID');
    await Room_Members_Ref.set({
        fName: "fName",
        lineID: "lineID",
        pictureURL: "pictureURL"
    });

    // LineChatAccount
    let LineChatAccount_Ref = db.collection('LineChatAccount').doc('LineID');
    await LineChatAccount_Ref.set({
        lineID: "lineID",
        displayName: "displayName",
        pictureURL: "pictureURL"
    });

    let LineChatAccount_Group_Ref = LineChatAccount_Ref.collection('Group').doc('LineGroupID');
    await LineChatAccount_Group_Ref.set({
        lineGroupID: "lineGroupID"
    });

    // LineGroup
    let LineGroup_Ref = db.collection('LineGroup').doc('LineGroupID');
    await LineGroup_Ref.set({
        lineGroupID: "lineGroupID"
    });

    let LineGroup_Trip_Ref = LineGroup_Ref.collection('Trip').doc('TripID');
    await LineGroup_Trip_Ref.set({
        tripID: "tripID",
        tripStatus: true,
        createDate: "createDate"
    });

    // TripList
    let TripList_Ref = db.collection('TripList').doc('TripID');
    await TripList_Ref.set({
        tripID: "tripID",
        tripName: "tripName",
        ownerTrip: "ownerTrip",
        province: "province",
        startDate: "startDate",
        endDate: "endDate",
        tripStatus: true
    });

    // TripPerDay
    let TripPerDay_Ref = db.collection('TripPerDay').doc('TripID');
    await TripPerDay_Ref.set({
        tripID: "tripID"
    });

    let TripPerDay_Date_Ref = TripPerDay_Ref.collection('Date').doc('EventDate');
    await TripPerDay_Date_Ref.set({
        eventDate: "eventDate",
        events:
            [
                {
                    eventName: "eventName",
                    eventType: "eventType",
                    startEvent: "startEvent",
                    endEvent: "endEvent"
                }
            ]
    });

    // Bill
    let Bill_Ref = db.collection('Bill').doc('LineGroupID');
    await Bill_Ref.set({
        lineGroupID: "lineGroupID"
    });

    let Bill_BillNo_Ref = Bill_Ref.collection('BillNo').doc('BillID');
    await Bill_BillNo_Ref.set({
        ownerBillID = "ownerBillID",
        ownerName = "ownerName",
        totalCost = "totalCost",
        billName = "billName",
        receivingAccount = "receivingAccount",
        payMentNumber = "payMentNumber",
        bankName = "bankName",
    });

    let Bill_BillNo_User_Ref = Bill_BillNo_Ref.collection('User').doc('UserID');
    await Bill_BillNo_User_Ref.set({
        fName: "fName",
        payStatus: true,
        userID: "userID",
        waitAcceptStatus: true
    });

    res.status(201).json('CREATED DATABASE');
});

module.exports = router;
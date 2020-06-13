var express = require('express');
var router = express.Router();
var firebase = require('firebase-admin');

let db = firebase.firestore()

// GET /trip  (ดูข้อมูลทริปทั้งหมด)
router.get('/', async function (req, res, next) {
    let lineGroupID = req.query.lineGroupID;
    let lineID = req.query.lineID;
    let result = await getAllTripByGroupID(lineGroupID, lineID);
    res.status(200).json(result);
})
// GET /trip/tripperday  (ดูข้อมูลทริปแบบรายวัน)
router.get('/tripperday', async function (req, res, next) {
    let lineGroupID = req.query.lineGroupID;
    let lineID = req.query.lineID;
    // Check : Date from Frontend ?
    let Date = req.query.Date;
    let result = await getTripPerDayByDate(lineGroupID, lineID, Date)
    res.status(200).json(result);
}) 
// POST /trip/createTrip   (เก็บข้อมูลทริป)
router.post('/createTrip', async function (req, res, next) {
    let datas = req.body
    await createTripList(datas);
    res.status(201).json({
        message: "create trip success"
    });
});
// POST /trip/deleteTrip   (ลบทริป)
router.delete('/deleteTrip', function (req, res, next) {
    deleteTrip(req.body)
    res.status(200).json({
        message: "Delete Trip Success"
    })
});

async function getAllTripByGroupID(lineGroupID, lineID) {
    let dataAllTrip = [];
    let tripID;
    let checkGroupRef = await db.collection('LineGroup').doc(lineGroupID);
    checkGroupRef.get().then(data => {
        if (data.exists) {
            let checkUserRef = checkGroup.collection('Member').doc(lineID);
            checkUserRef.get().then(data => {
                if (!data.exists) {
                    message: 'User cannot check the Trip';
                    return message;
                } else {
                    let checkTripIDRef = db.collection('LineGroup').doc(lineGroupID);
                    checkTripIDRef.collection('Trip').get()
                        .then(doc => {
                            tripID = doc.data()
                        });

                    console.log('tripID : ' + tripID);

                    let showAllTrip = db.collection('TripPerDay').doc(tripID);
                    showAllTrip.get().then(snapshot => {
                        snapshot.forEach(doc => {

                            console.log(doc.tripID, '=>', doc.data());

                            dataAllTrip.push(doc.data());
                        });
                    })
                        .catch(err => {
                            console.log('Error getting documents', err);
                        });
                }
            })
        } else {
            message: 'No Trip in the group , Please create trip.'
            return message;
        }
    })
    return dataList
}

async function getTripPerDayByDate(lineGroupID, lineID, Date) {
    let dataTripPerDay = [];
    let checkGroupRef = await db.collection('LineGroup').doc(lineGroupID);
    checkGroupRef.get().then(data => {
        if (data.exists) {
            let checkUserRef = checkGroup.collection('Member').doc(lineID);
            checkUserRef.get().then(data => {
                if (!data.exists) {
                    message: 'User cannot check the Trip';
                    return message;
                } else {
                    let checkTripIDRef = db.collection('LineGroup').doc(lineGroupID);
                    checkTripIDRef.collection('Trip').get()
                        .then(doc => {
                            tripID = doc.data()
                        });

                    console.log('tripID : ' + tripID);

                    let showTrip = db.collection('TripPerDay').doc(tripID);
                    // let day = ?? 
                    // let showTripPerDayinTripID = await showTrip.collection('Day').doc(day);
                    showTripPerDayinTripID.get().then(snapshot => {
                        snapshot.forEach(doc => {

                            console.log(doc.tripID, '=>', doc.data());

                            dataTripPerDay.push(doc.data());
                        });
                    })
                        .catch(err => {
                            console.log('Error getting documents', err);
                        });
                }
            })
        } else {
            message: 'No Trip in the group , Please create trip.'
            return message;
        }
    })
    return dataTripPerDay;
}

async function generateTripID() {
    function ran() {
        let myTripId = Math.floor(Math.random() * 1000000) + 1;
        return myTripId;
    }

    let result;
    let checkDocumentisEmpty = true;

    do {
        let id = await ran();
        let CheckTripIDRef = db.collection('Room');
        let tripID = 'T_' + id;
        let query = await CheckTripIDRef.doc(tripID).get()
            .then(doc => {
                // ถ้าไม่มีข้อมูลอยู่
                if (!doc.exists) {
                    checkDocumentisEmpty = false;
                    result = 'T_' + id;
                    console.log('You can use Trip ID : ' + result);
                }
            })
    } while (checkDocumentisEmpty == true)
    return result;
}

async function createTripList(datas) {
    // fix : ถ้ากด create trip จะได้ trip id มา
    let genTripID = await generateTripID();
    console.log('tripID : ' + genTripID);

    let CheckLineChatAccountRef = await db.collection('LineChatAccount').doc(datas.lineID);
    CheckLineChatAccountRef.get().then(data => {
        if (data.exists) {
            let saveLineChatAccountRef = CheckLineChatAccountRef.update({
                // lineID: datas.lineID,
                displayName: datas.displayName,
                // email: datas.email,
                pictureURL: datas.pictureURL
            })
            // Check Update Trip
            let CheckLineGroupinLineChatAccount = CheckLineChatAccountRef.collection('Group').doc(datas.lineGroupID)
            CheckLineGroupinLineChatAccount.get().then(data => {
                // กรณี : update
                if (data.exists) {
                    let checkTripRef = db.collection('LineGroup').doc(datas.lineGroupID);
                    checkTripRef.get().then(data => {
                        if (data.exists) {
                            let CheckTripinLineGroup = checkTripRef.collection('Trip').doc(datas.tripID)
                                .get().then(data => {
                                    if (data.exists) {
                                        let saveTripListRef = db.collection('TripList').doc(datas.tripID);
                                        saveTripListRef.get().then(data => {
                                            if (data.exists) {
                                                saveTripListRef.set({
                                                    tripname: datas.tripname,
                                                    province: datas.province,
                                                    startDate: datas.startDate,
                                                    endDate: datas.endDate,
                                                    tripStatus: datas.tripStatus
                                                })
                                                let checkTripPerDay = db.collection('TripPerDay').doc(datas.tripID);
                                                checkTripPerDay.get().then(data => {
                                                    if (data.exists) {
                                                        // checkTripPerDay.collection('Day').doc().set({
                                                        //     eventName: datas.eventName,
                                                        //     StartEventTime: datas.StartEventTime,
                                                        //     endEventTime: datas.endEventTime,
                                                        //     eventType: datas.eventType
                                                        // }) 
                                                        //--------------------------------------------------------------//
                                                        // let tripID = datas.tripID;
                                                        // let ก้อนข้อมูลของPerDay
                                                        // let createTripPerDay = createTripPerday(tripID,ก้อนข้อมูลของPerDay);
                                                    } else {
                                                        console.log('Error : Create Trip = TripPerDay')
                                                    }
                                                })
                                            } else {
                                                console.log('Error : Create Trip = TripList')
                                            }
                                        })
                                    } else {
                                        console.log('Error : Create Trip = Trip')
                                    }
                                })
                        } else {
                            console.log('Error : Create Trip = LineGroup')
                        }
                    })
                    // กรณี : new Trip แต่มี LineChatAcc แล้ว
                } else {
                    let saveTripIDinTripListRef = CheckLineChatAccountRef.collection('Group').doc(datas.lineGroupID);
                    saveTripIDinTripListRef.set({
                        lineGroupID: datas.lineGroupID,
                    })
                    let saveGroupIDinGroupRef = db.collection('LineGroup').doc(datas.lineGroupID);
                    saveGroupIDinGroupRef.set({
                        lineGroupID: datas.lineGroupID,
                    })
                    let saveMemberinGroup = saveGroupIDinGroupRef.collection('Member').doc(datas.lineID);
                    saveMemberRef.set({
                        lineID: datas.lineID
                    })
                    let saveTripIDinGroup = saveGroupIDinGroupRef.collection('Trip').doc(genTripID);
                    saveTripIDinGroup.set({
                        tripID: genTripID
                    })
                    let saveTripList = db.collection('TripList').doc(genTripID).set({
                        tripID: genTripID,
                        tripname: datas.tripname,
                        province: datas.province,
                        startDate: datas.startDate,
                        endDate: datas.endDate,
                        tripStatus: datas.tripStatus
                    })
                    let saveTripPerDay = db.collection('TripPerDay').doc(genTripID).set({
                        tripID: genTripID
                    })
                    // saveTripPerDay.collection('Day').doc().set({
                    //     eventName: datas.eventName,
                    //     StartEventTime: datas.StartEventTime,
                    //     endEventTime: datas.endEventTime,
                    //     eventType: datas.eventType
                    // })
                    //---------------------------------------------------------------//
                    // let tripID = genTripID;
                    // let ก้อนข้อมูลของPerDay
                    // let createTripPerDay = createTripPerday(tripID,ก้อนข้อมูลของPerDay);
                }
            })
            //  กรณี : new User + Trip 
        } else {
            let saveLineChatAccountRef = CheckLineChatAccountRef.set({
                lineID: datas.lineID,
                displayName: datas.displayName,
                email: datas.email,
                pictureURL: datas.pictureURL
            })
            let saveTripIDinTripListRef = CheckLineChatAccountRef.collection('Group').doc(datas.lineGroupID);
            saveTripIDinTripListRef.set({
                lineGroupID: datas.lineGroupID,
            })
            let saveGroupIDinGroupRef = db.collection('LineGroup').doc(datas.lineGroupID);
            saveGroupIDinGroupRef.set({
                lineGroupID: datas.lineGroupID,
            })
            let saveMemberinGroup = saveGroupIDinGroupRef.collection('Member').doc(datas.lineID);
            saveMemberRef.set({
                lineID: datas.lineID
            })
            let saveTripIDinGroup = saveGroupIDinGroupRef.collection('Trip').doc(genTripID);
            saveTripIDinGroup.set({
                tripID: genTripID
            })
            let saveTripList = db.collection('TripList').doc(genTripID).set({
                tripID: genTripID,
                tripname: datas.tripname,
                province: datas.province,
                startDate: datas.startDate,
                endDate: datas.endDate,
                tripStatus: datas.tripStatus
            })
            let saveTripPerDay = db.collection('TripPerDay').doc(genTripID).set({
                tripID: genTripID
            })
            // saveTripPerDay.collection('Day').doc().set({
            //     eventName: datas.eventName,
            //     StartEventTime: datas.StartEventTime,
            //     endEventTime: datas.endEventTime,
            //     eventType: datas.eventType
            // })
            //---------------------------------------------------------------//
            // let tripID = genTripID;
            // let ก้อนข้อมูลของPerDay
            // let createTripPerDay = createTripPerday(tripID,ก้อนข้อมูลของPerDay);
        }
    })

    // let saveLineGroupinLineChatAccount = await saveLineChatAccountRef.collection('Group').doc(datas.lineGroupID)
    // saveLineGroupinLineChatAccount.set({
    //     GroupID: datas.lineGroupID
    // })
    // let checkTripRef = await db.collection('LineGroup').doc(datas.lineGroupID);
    // checkTripRef.get().then(data => {
    //     if (!data.exists) {
    //         let saveTripIDinGroupRef = db.collection('LineGroup').doc(datas.lineGroupID);
    //         saveTripIDinGroupRef.set({
    //             lineGroupID: datas.lineGroupID,
    //         })

    //         saveTripIDinGroupRef.collection('Trip').doc(genTripID)
    //             .set({
    //                 // ** ต้องเก็บตาม doc uniqueKey ที่เขา Gen ให้ **
    //                 tripID: genTripID
    //             })
    //         let saveMemberRef = saveTripIDinGroupRef.collection('Member').doc(datas.lineID);
    //         saveMemberRef.set({
    //             lineID: datas.lineID
    //         })
    //         let saveTripinTriplistRef = db.collection('TripList').doc(genTripID);
    //         saveTripinTriplistRef.set({
    //             tripID: genTripID,
    //             tripname: datas.tripname,
    //             province: datas.province,
    //             date: datas.date,
    //             day: datas.day,
    //             status: datas.status
    //         }).then(doc => {
    //             console.log(doc.data());
    //         })
    //     } else {
    //         message: 'You have Trip already!'
    //         return message;
    //     }
    // })
    // createTripPerday(datas);
    // }
}

async function createTripPerday(tripID, ก้อนข้อมูลของPerDay) {
    // ต้องวนลูปเก็บข้อมูลแต่ละ Day
    let saveTripPerDayRef = await db.collection('TripPerDay').doc(tripID);
    saveTripPerDayRef.collection('Day').doc().set({
        eventName: datas.eventName,
        StartEventTime: datas.StartEventTime,
        endEventTime: datas.endEventTime,
        eventType: datas.eventType
    })
}

async function deleteTrip(datas) {
    await db.collection('TripList').doc(datas.tripID).delete();
    await db.collection('LineGroup').doc(datas.lineGroupID).collection('Trip').doc(datas.tripID).delete();
    await db.collection('LineGroup').doc(datas.lineGroupID).delete();
    // ? : ลบข้อมูลใน collection 'Day' ให้หมด ยังไง ??
    // await db.collection('TripPerDay').doc(datas.lineGroupID).collection('Day').doc().delete();
    await db.collection('TripPerDay').doc(datas.lineGroupID)
        .then(function () {
            console.log("Trip successfully deleted!");
        }).catch(function (error) {
            console.error("Error deleted document trip: ", error);
        });
}

async function setTripHistory(datas) {

}

module.exports = router;
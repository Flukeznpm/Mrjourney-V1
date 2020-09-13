var express = require('express');
var router = express.Router();
var firebase = require('firebase-admin');
const { firestore } = require('firebase-admin');
let db = firebase.firestore();

//---------------- Controller ----------------//
// GET /trip  (ดูข้อมูลทริปทั้งหมด)
// GET /trip/tripperday  (ดูข้อมูลทริปแบบรายวัน)
// POST /trip/createTrip   (เก็บข้อมูลทริป)
// PUT /trip/editTrip  (แก้ไขข้อมูลริป)
// DELETE /trip/deleteTrip  (ลบทริป)

router.get('/', async function (req, res, next) {
    let lineGroupID = req.query.lineGroupID;
    let lineID = req.query.lineID;
    if (lineGroupID == undefined || lineGroupID == null || lineGroupID == '' ||
        lineID == undefined || lineID == null || lineID == '') {
        console.log('Alert: The Data was empty or undefined"')
        return res.status(400).json({
            message: "The Data was empty or undefined"
        })
    } else {
        let checkGroupRef = await db.collection('LineGroup').doc(lineGroupID);
        checkGroupRef.get().then(async data => {
            if (data.exists) {
                let checkUserRef = await checkGroupRef.collection('Member').doc(lineID);
                checkUserRef.get().then(async data => {
                    if (data.exists) {
                        let result = await getAllTripByGroupID(lineGroupID);
                        console.log('Get Trip list success: ', result)
                        res.status(200).json(result);
                    } else {
                        console.log('Alert: You cannot check this Trip')
                        let message = "You cannot check this Trip"
                        return res.status(400).json(message);
                    }
                })
            } else {
                console.log('Alert: No Trip in the group , Please create trip.')
                let message = "No Trip in the group , Please create trip."
                return res.status(400).json(message);
            }
        })
    }
});

router.get('/tripperday', async function (req, res, next) {
    const lineGroupID = req.query.lineGroupID;
    const lineID = req.query.lineID;
    const DateOfTrip = req.query.dateOfTrip;

    console.log('DateOfTrip: ', DateOfTrip)

    if (lineGroupID == undefined || lineGroupID == null || lineGroupID == '' ||
        lineID == undefined || lineID == null || lineID == '' ||
        DateOfTrip == undefined || DateOfTrip == null || DateOfTrip == '') {
        console.log('Alert: The Data was empty or undefined"')
        return res.status(400).json({
            message: "The Data was empty or undefined"
        })
    } else {
        const checkGroupRef = await db.collection('LineGroup').doc(lineGroupID);
        checkGroupRef.get().then(async data => {
            if (data.exists) {
                const checkUserRef = await checkGroupRef.collection('Member').doc(lineID);
                checkUserRef.get().then(async data => {
                    if (data.exists) {
                        const result = await getTripPerDayByDate(lineGroupID, DateOfTrip)
                        console.log('Get Trip per day success')
                        console.log(result)
                        res.status(200).json(result);
                    } else {
                        console.log('Alert: You cannot check this Trip per day')
                        const message = "You cannot check this Trip per day"
                        return res.status(400).json(message);
                    }
                })
            } else {
                console.log('Alert: No Trip in the group , Please create trip.')
                const message = "No Trip in the group , Please create trip."
                return res.status(400).json(message);
            }
        });
    }
});

router.post('/createTrip', async function (req, res, next) {
    let datas = req.body;
    if (datas.lineID == undefined || datas.lineID == null || datas.lineID == '' ||
        datas.displayName == undefined || datas.displayName == null || datas.displayName == '' ||
        datas.pictureURL == undefined || datas.pictureURL == null || datas.pictureURL == '' ||
        datas.lineGroupID == undefined || datas.lineGroupID == null || datas.lineGroupID == '' ||
        datas.tripName == undefined || datas.tripName == null || datas.tripName == '' ||
        datas.province == undefined || datas.province == null || datas.province == '' ||
        datas.startDate == undefined || datas.startDate == null || datas.startDate == '' ||
        datas.endDate == undefined || datas.endDate == null || datas.endDate == '' ||
        datas.tripStatus == undefined || datas.tripStatus == null || datas.tripStatus == false ||
        datas.events == undefined || datas.events == null || datas.events == false) {
        return res.status(400).json({
            message: "The Data was empty or undefined"
        })
    } else {
        await createTripList(datas);
        res.status(201).json({
            message: "create trip success"
        })
    }
})

router.put('/editTrip', async function (req, res, next) {
    let datas = req.body;
    if (datas.tripID == undefined || datas.tripID == null || datas.tripID == '' ||
        datas.ownerTrip == undefined || datas.ownerTrip == null || datas.ownerTrip == '' ||
        datas.lineID == undefined || datas.lineID == null || datas.lineID == '' ||
        datas.lineGroupID == undefined || datas.lineGroupID == null || datas.lineGroupID == '' ||
        datas.tripName == undefined || datas.tripName == null || datas.tripName == '' ||
        datas.province == undefined || datas.province == null || datas.province == '' ||
        datas.startDate == undefined || datas.startDate == null || datas.startDate == '' ||
        datas.endDate == undefined || datas.endDate == null || datas.endDate == '' ||
        datas.tripStatus == undefined || datas.tripStatus == null || datas.tripStatus == false ||
        datas.events == undefined || datas.events == null || datas.events == false) {
        return res.status(400).json({
            message: "The Data was empty or undefined"
        })
    } else {
        const checkPermissionRef = db.collection('TripList').where('tripID', '==', datas.tripID).where('ownerTrip', '==', datas.lineID);
        await checkPermissionRef.get().then(async data => {
            if (data.empty) {
                console.log('You do not have permission to update trip');
                return;
            } else {
                await updateTrip(datas)
                res.status(201).json({
                    message: "Edit Room Success"
                })
            }
        })
    }
});

router.delete('/deleteTrip', async function (req, res, next) {
    let datas = req.body;
    if (datas.tripID == undefined || datas.tripID == null || datas.tripID == '') {
        console.log('Alert: The Data was empty or undefined"')
        res.status(400).json({
            message: "The Data was empty or undefined"
        })
    } else {
        //let checkPermission = await db.collection('TripList').doc(datas.tripID).collection('Owner').doc(datas.ownerTrip);
        let checkPermission = await db.collection('TripList').where('tripID', '==', datas.tripID).where('ownerTrip', '==', datas.ownerTrip);
        checkPermission.get().then(async data => {
            if (data.exists) {
                await deleteTrip(req.body)
                res.status(200).json({
                    message: "Delete Trip Success"
                })
            } else {
                return res.status(400).json({
                    message: "You do not have permission to delete trip"
                })
            }
        })
    }
});

//---------------- Function ----------------//
async function getAllTripByGroupID(lineGroupID) {
    let dataTripAllDay = [];
    let tripIDList = [];
    let checkTripIDRef = db.collection('LineGroup').doc(lineGroupID).collection('Trip');
    await checkTripIDRef.get().then(snapshot => {
        snapshot.forEach(doc => {
            tripIDList.push(doc.data());
        })
    })

    let tripID = tripIDList.map(t => t.tripID).toString();

    let showAllTrip = db.collection('TripPerDay').doc(tripID);
    await showAllTrip.get().then(doc => {
        dataTripAllDay.push(doc.data());
    })
        .catch(err => {
            console.log('Error getting All Trip detail', err);
        });

    return dataTripAllDay;
};

async function getTripPerDayByDate(lineGroupID, DateOfTrip) {
    const dataTripPerDay = [];
    const tripIDList = [];
    const checkTripIDRef = db.collection('LineGroup').doc(lineGroupID).collection('Trip');
    await checkTripIDRef.get().then(snapshot => {
        snapshot.forEach(doc => {
            tripIDList.push(doc.data());
        })
    })

    let tripID = tripIDList.map(t => t.tripID).toString();
    console.log('Trip ID: ', tripID);

    const showTripPerDay = db.collection('TripPerDay');
    const queryTripPerDay = await showTripPerDay.where('tripID', '==', tripID).where(new firestore.FieldPath('events', 'eventDate'), '==', DateOfTrip);

    await queryTripPerDay.get().then(async res => {
        if (queryTripPerDay.empty) {
            console.log('No matching documents.');
            return;
        }
        await res.forEach(async doc => {
            dataTripPerDay.push(doc.data());
        });
    })

    return dataTripPerDay;
};

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
                    // console.log('You can use Trip ID : ' + result);
                }
            })
    } while (checkDocumentisEmpty == true)
    return result;
};

async function createTripList(datas) {
    let genTripID = await generateTripID();
    let CheckLineChatAccountRef = await db.collection('LineChatAccount').doc(datas.lineID);
    CheckLineChatAccountRef.get().then(async data => {
        // กรณี : User เคยใช้งาน Bot แล้ว(มี Account ในระบบ) และต้องการจะ Create Trip ใหม่
        if (data.exists) {
            await CheckLineChatAccountRef.update({
                lineID: datas.lineID,
                displayName: datas.displayName,
                pictureURL: datas.pictureURL
            })
            let saveTripIDinTripListRef = await CheckLineChatAccountRef.collection('Group').doc(datas.lineGroupID);
            saveTripIDinTripListRef.set({
                lineGroupID: datas.lineGroupID,
            })
            let saveGroupIDinGroupRef = await db.collection('LineGroup').doc(datas.lineGroupID);
            saveGroupIDinGroupRef.set({
                lineGroupID: datas.lineGroupID,
            })
            let saveMemberinGroup = await saveGroupIDinGroupRef.collection('Member').doc(datas.lineID);
            saveMemberinGroup.set({
                lineID: datas.lineID
            })
            let saveTripIDinGroup = await saveGroupIDinGroupRef.collection('Trip').doc(genTripID);
            saveTripIDinGroup.set({
                tripID: genTripID
            })
            let saveTripList = await db.collection('TripList').doc(genTripID).set({
                tripID: genTripID,
                ownerTrip: datas.lineID,
                tripName: datas.tripName,
                province: datas.province,
                startDate: datas.startDate,
                endDate: datas.endDate,
                tripStatus: datas.tripStatus
            })
            let saveTripPerDay = await db.collection('TripPerDay').doc(genTripID).set({
                tripID: genTripID,
                events: datas.events
            })
            // await saveTripPerDay.collection('Day').doc().set({
            //     eventDate: datas.eventDate,
            //     eventName: datas.eventName,
            //     startEventTime: datas.startEventTime,
            //     endEventTime: datas.endEventTime,
            //     eventType: datas.eventType
            // })
        } else {
            // กรณี : User ใหม่ที่ต้องการจะ Create Trip
            await CheckLineChatAccountRef.set({
                lineID: datas.lineID,
                displayName: datas.displayName,
                pictureURL: datas.pictureURL
            })
            let saveTripIDinTripListRef = await CheckLineChatAccountRef.collection('Group').doc(datas.lineGroupID);
            saveTripIDinTripListRef.set({
                lineGroupID: datas.lineGroupID,
            })
            let saveGroupIDinGroupRef = await db.collection('LineGroup').doc(datas.lineGroupID);
            saveGroupIDinGroupRef.set({
                lineGroupID: datas.lineGroupID,
            })
            let saveMemberinGroup = await saveGroupIDinGroupRef.collection('Member').doc(datas.lineID);
            saveMemberinGroup.set({
                lineID: datas.lineID
            })
            let saveTripIDinGroup = await saveGroupIDinGroupRef.collection('Trip').doc(genTripID);
            saveTripIDinGroup.set({
                tripID: genTripID
            })
            let saveTripList = await db.collection('TripList').doc(genTripID).set({
                tripID: genTripID,
                ownerTrip: datas.lineID,
                tripName: datas.tripName,
                province: datas.province,
                startDate: datas.startDate,
                endDate: datas.endDate,
                tripStatus: datas.tripStatus
            })
            let saveTripPerDay = await db.collection('TripPerDay').doc(genTripID).set({
                tripID: genTripID,
                events: datas.events
            })
            // await saveTripPerDay.collection('Day').doc().set({
            //     eventDate: datas.eventDate,
            //     eventName: datas.eventName,
            //     startEventTime: datas.startEventTime,
            //     endEventTime: datas.endEventTime,
            //     eventType: datas.eventType
            // })
        }
    })
};

async function updateTrip(datas) {
    let message;
    let CheckLineChatAccountRef = await db.collection('LineChatAccount').doc(datas.lineID);
    CheckLineChatAccountRef.get().then(async data => {
        if (data.exists) {
            await CheckLineChatAccountRef.update({
                lineID: datas.lineID,
                displayName: datas.displayName,
                email: datas.email,
                pictureURL: datas.pictureURL
            })
            let CheckLineGroupinLineChatAccount = CheckLineChatAccountRef.collection('Group').doc(datas.lineGroupID);
            await CheckLineGroupinLineChatAccount.get().then(async data => {
                if (data.exists) {
                    let CheckTripRef = db.collection('LineGroup').doc(datas.lineGroupID);
                    await CheckTripRef.get().then(async data => {
                        if (data.exists) {
                            let CheckTripinLineGroup = await checkTripRef.collection('Trip').doc(datas.tripID);
                            await CheckTripinLineGroup.get().then(async data => {
                                if (data.exists) {
                                    let CheckTripListRef = db.collection('TripList').doc(datas.tripID);
                                    await CheckTripListRef.get().then(async data => {
                                        if (data.exists) {
                                            CheckTripListRef.update({
                                                tripName: datas.tripName,
                                                province: datas.province,
                                                startDate: datas.startDate,
                                                endDate: datas.endDate,
                                                tripStatus: datas.tripStatus
                                            })
                                            let CheckTripPerDay = db.collection('TripPerDay').doc(datas.tripID);
                                            await CheckTripPerDay.get().then(async data => {
                                                if (data.exists) {
                                                    await CheckTripPerDay.update({
                                                        events: datas.events
                                                    })
                                                    // CheckTripPerDay.collection('Day').doc().update({
                                                    //     eventDate: datas.eventDate,
                                                    //     eventName: datas.eventName,
                                                    //     startEventTime: datas.startEventTime,
                                                    //     endEventTime: datas.endEventTime,
                                                    //     eventType: datas.eventType
                                                    // }) 
                                                } else {
                                                    console.log('Error Update Trip: TripPerDay not found')
                                                    return res.status(400).json({
                                                        message: 'Error Update Trip: TripPerDay not found'
                                                    })
                                                }
                                            })
                                        }
                                    })
                                } else {
                                    console.log('Error Update Trip: TripList not found')
                                    return res.status(400).json({
                                        message: 'Error Update Trip: TripList not found'
                                    })
                                }
                            })
                        } else {
                            console.log('Error Update Trip: Trip not found')
                            return res.status(400).json({
                                message: 'Error Update Trip: Trip not found'
                            })
                        }
                    })
                } else {
                    console.log('Error Update Trip: LineGroup not found')
                    return res.status(400).json({
                        message: 'Error Update Trip: LineGroup not found'
                    })
                }
            })
        }
    })
};

async function deleteTrip(datas) {
    await db.collection('TripList').doc(datas.tripID).delete();
    await db.collection('LineGroup').doc(datas.lineGroupID).collection('Trip').doc(datas.tripID).delete();
    await db.collection('LineGroup').doc(datas.lineGroupID).delete();
    await db.collection('LineChatAccount').doc(datas.lineID).collection('Group').doc(datas.lineGroupID).delete();

    // ? : ลบข้อมูลใน collection 'Day' ให้หมด ยังไง ??
    // await db.collection('TripPerDay').doc(datas.lineGroupID).collection('Day').doc().delete();
    await db.collection('TripPerDay').doc(datas.lineGroupID)
        .then(function () {
            console.log("Trip successfully deleted!");
        }).catch(function (error) {
            console.error("Error deleted document trip: ", error);
        });
};

async function setTripHistory(datas) {

};

module.exports = router;
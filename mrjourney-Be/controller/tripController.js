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
                let checkUserRef = await checkGroup.collection('Member').doc(lineID);
                checkUserRef.get().then(async data => {
                    if (data.exists) {
                        let result = await getAllTripByGroupID(lineGroupID);
                        console.log('Get Trip list ßsuccess')
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
    let lineGroupID = req.query.lineGroupID;
    let lineID = req.query.lineID;
    // Check : Date from Frontend ?
    let Dates = req.query.Date;

    if (lineGroupID == undefined || lineGroupID == null || lineGroupID == '' ||
        lineID == undefined || lineID == null || lineID == '' ||
        Dates == undefined || Dates == null || Dates == '') {
        console.log('Alert: The Data was empty or undefined"')
        return res.status(400).json({
            message: "The Data was empty or undefined"
        })
    } else {
        let checkGroupRef = await db.collection('LineGroup').doc(lineGroupID);
        checkGroupRef.get().then(async data => {
            if (data.exists) {
                let checkUserRef = await checkGroup.collection('Member').doc(lineID);
                checkUserRef.get().then(async data => {
                    if (data.exists) {
                        let result = await getTripPerDayByDate(lineGroupID, Dates)
                        console.log('Get Trip per day success')
                        res.status(200).json(result);
                    } else {
                        console.log('Alert: You cannot check this Trip per day')
                        let message = "You cannot check this Trip per day"
                        return res.status(400).json(message);
                    }
                })
            } else {
                console.log('Alert: No Trip in the group , Please create trip.')
                let message = "No Trip in the group , Please create trip."
                return res.status(400).json(message);
            }
        });
    }
});

router.post('/createTrip', async function (req, res, next) {
    let datas = req.body;
    if (datas.lineID == undefined || datas.lineID == null || datas.lineID == '' ||
        datas.lineGroupID == undefined || datas.lineGroupID == null || datas.lineGroupID == '' ||
        datas.tripname == undefined || datas.tripname == null || datas.tripname == '' ||
        datas.province == undefined || datas.province == null || datas.province == '' ||
        datas.startDate == undefined || datas.startDate == null || datas.startDate == '' ||
        datas.endDate == undefined || datas.endDate == null || datas.endDate == '' ||
        datas.tripStatus == undefined || datas.tripStatus == null || datas.tripStatus == false ||
        datas.event == undefined || datas.event == null || datas.event == false) {
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
        datas.OwnerTrip == undefined || datas.OwnerTrip == null || datas.OwnerTrip == '' ||
        datas.lineID == undefined || datas.lineID == null || datas.lineID == '' ||
        datas.lineGroupID == undefined || datas.lineGroupID == null || datas.lineGroupID == '' ||
        datas.tripname == undefined || datas.tripname == null || datas.tripname == '' ||
        datas.province == undefined || datas.province == null || datas.province == '' ||
        datas.startDate == undefined || datas.startDate == null || datas.startDate == '' ||
        datas.endDate == undefined || datas.endDate == null || datas.endDate == '' ||
        datas.tripStatus == undefined || datas.tripStatus == null || datas.tripStatus == false ||
        datas.event == undefined || datas.event == null || datas.event == false) {
        return res.status(400).json({
            message: "The Data was empty or undefined"
        })
    } else {
        //let checkPermission = await db.collection('TripList').doc(datas.tripID).collection('Owner').doc(datas.OwnerTrip);
        let checkPermission = await db.collection('TripList').where('tripID', '==', datas.tripID).where('OwnerTrip', '==', datas.OwnerTrip);
        checkPermission.get().then(async data => {
            if (data.exists) {
                await updateTrip(datas).then(res => {
                    return res
                })
            } else {
                return res.status(400).json({
                    message: "You do not have permission to update trip"
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
        //let checkPermission = await db.collection('TripList').doc(datas.tripID).collection('Owner').doc(datas.OwnerTrip);
        let checkPermission = await db.collection('TripList').where('tripID', '==', datas.tripID).where('OwnerTrip', '==', datas.OwnerTrip);
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
    let dataAllTrip = [];
    let checkTripIDRef = db.collection('LineGroup').doc(lineGroupID);
    let getTripID = await checkTripIDRef.collection('Trip').get().then(doc => {
        tripID = doc.data
    });

    console.log('tripID : ' + getTripID);

    let showAllTrip = await db.collection('TripPerDay').doc(getTripID);
    showAllTrip.get().then(snapshot => {
        snapshot.forEach(doc => {

            console.log(doc.tripID, '=>', doc.data());

            dataAllTrip.push(doc.data());
        });
    })
        .catch(err => {
            console.log('Error getting documents', err);
        });
    return dataList;
};

async function getTripPerDayByDate(lineGroupID, DateOfTrip) {
    console.log(DateOfTrip);
    let dataTripPerDay = [];
    let day = DateOfTrip;
    let checkTripIDRef = await db.collection('LineGroup').doc(lineGroupID);
    let getTripID = await checkTripIDRef.collection('Trip').get().then(doc => {
        tripID = doc.data
    });

    console.log('tripID : ' + getTripID);

    let showTripPerDay = await db.collection('TripPerDay').doc(getTripID).where(new firestore.FieldPath('', ''), '==', day);
    await showTripPerDay.get().then(snapshot => {
        snapshot.forEach(doc => {
            dataTripPerDay.push(doc.data());
        });
    })
        .catch(err => {
            console.log('Error getting documents', err);
        });
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
                    console.log('You can use Trip ID : ' + result);
                }
            })
    } while (checkDocumentisEmpty == true)
    return result;
};

async function createTripList(datas) {
    let genTripID = await generateTripID();
    console.log('tripID : ' + genTripID);
    let CheckLineChatAccountRef = await db.collection('LineChatAccount').doc(datas.lineID);
    CheckLineChatAccountRef.get().then(async data => {
        // กรณี : User เคยใช้งาน Bot แล้ว(มี Account ในระบบ) และต้องการจะ Create Trip ใหม่
        if (data.exists) {
            await CheckLineChatAccountRef.update({
                lineID: datas.lineID,
                displayName: datas.displayName,
                email: datas.email,
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
            saveMemberRef.set({
                lineID: datas.lineID
            })
            let saveTripIDinGroup = awaitsaveGroupIDinGroupRef.collection('Trip').doc(genTripID);
            saveTripIDinGroup.set({
                tripID: genTripID
            })
            let saveTripList = await db.collection('TripList').doc(genTripID).set({
                tripID: genTripID,
                OwnerTrip: datas.lineID,
                tripname: datas.tripname,
                province: datas.province,
                startDate: datas.startDate,
                endDate: datas.endDate,
                tripStatus: datas.tripStatus
            })
            let saveTripPerDay = await db.collection('TripPerDay').doc(genTripID).set({
                tripID: genTripID,
                event: datas.event
            })
            // await saveTripPerDay.collection('Day').doc().set({
            //     eventDate: datas.eventDate,
            //     eventName: datas.eventName,
            //     startEventTime: datas.startEventTime,
            //     endEventTime: datas.endEventTime,
            //     eventType: datas.eventType
            // })
            return res.status(201).json({
                message: 'Edit trip success'
            })
        } else {
            // กรณี : User ใหม่ที่ต้องการจะ Create Trip
            await CheckLineChatAccountRef.set({
                lineID: datas.lineID,
                displayName: datas.displayName,
                email: datas.email,
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
            saveMemberRef.set({
                lineID: datas.lineID
            })
            let saveTripIDinGroup = await saveGroupIDinGroupRef.collection('Trip').doc(genTripID);
            saveTripIDinGroup.set({
                tripID: genTripID
            })
            let saveTripList = await db.collection('TripList').doc(genTripID).set({
                tripID: genTripID,
                OwnerTrip: datas.lineID,
                tripname: datas.tripname,
                province: datas.province,
                startDate: datas.startDate,
                endDate: datas.endDate,
                tripStatus: datas.tripStatus
            })
            let saveTripPerDay = await db.collection('TripPerDay').doc(genTripID).set({
                tripID: genTripID,
                event: datas.event
            })
            // await saveTripPerDay.collection('Day').doc().set({
            //     eventDate: datas.eventDate,
            //     eventName: datas.eventName,
            //     startEventTime: datas.startEventTime,
            //     endEventTime: datas.endEventTime,
            //     eventType: datas.eventType
            // })
            return res.status(201).json({
                message: 'Create trip success'
            })
        }
    })
}

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
            let CheckLineGroupinLineChatAccount = CheckLineChatAccountRef.collection('Group').doc(datas.lineGroupID)
            CheckLineGroupinLineChatAccount.get().then(async data => {
                if (data.exists) {
                    let CheckTripRef = await db.collection('LineGroup').doc(datas.lineGroupID);
                    CheckTripRef.get().then(async data => {
                        if (data.exists) {
                            let CheckTripinLineGroup = await checkTripRef.collection('Trip').doc(datas.tripID)
                                .get().then(async data => {
                                    if (data.exists) {
                                        let CheckTripListRef = await db.collection('TripList').doc(datas.tripID);
                                        CheckTripListRef.get().then(async data => {
                                            if (data.exists) {
                                                let checkOwnerTrip = await db.collection('TripList').where('tripID', '==', datas.tripID).where('OwnerTrip', '==', datas.OwnerTrip);
                                                checkOwnerTrip.get().then(async data => {
                                                    if (data.exists) {
                                                        saveTripListRef.update({
                                                            tripname: datas.tripname,
                                                            province: datas.province,
                                                            startDate: datas.startDate,
                                                            endDate: datas.endDate,
                                                            tripStatus: datas.tripStatus
                                                        })
                                                        let checkTripPerDay = db.collection('TripPerDay').doc(datas.tripID);
                                                        checkTripPerDay.get().then(data => {
                                                            if (data.exists) {
                                                                checkTripPerDay.update({
                                                                    event: datas.event
                                                                })
                                                                // checkTripPerDay.collection('Day').doc().update({
                                                                //     eventDate: datas.eventDate,
                                                                //     eventName: datas.eventName,
                                                                //     startEventTime: datas.startEventTime,
                                                                //     endEventTime: datas.endEventTime,
                                                                //     eventType: datas.eventType
                                                                // }) 
                                                                return res.status(201).json({
                                                                    message: 'Edit trip success'
                                                                })
                                                            } else {
                                                                console.log('Error Update Trip: TripPerDay not found')
                                                                return res.status(400).json({
                                                                    message: 'Error Update Trip: TripPerDay not found'
                                                                })
                                                            }
                                                        })
                                                    } else {
                                                        console.log('Error Update Trip: Permission not found')
                                                        return res.status(400).json({
                                                            message: 'Error Update Trip: Owner not found'
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
        } else {
            return res.status(400).json({
                message: 'Error Update Trip: Permission not found'
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
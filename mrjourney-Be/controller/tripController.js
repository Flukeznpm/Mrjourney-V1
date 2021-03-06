var express = require('express');
var router = express.Router();
var firebase = require('firebase-admin');
const { firestore } = require('firebase-admin');
let db = firebase.firestore();
const https = require('https');
const axios = require('axios');

// GET /trip  (ดูข้อมูลทริปทั้งหมด)
// GET /trip/tripperday  (ดูข้อมูลทริปแบบรายวัน)
// POST /trip/createTrip   (เก็บข้อมูลทริป)
// PUT /trip/editTrip  (แก้ไขข้อมูลริป)
// DELETE /trip/deleteTrip  (ลบทริป)

router.get('/', async function (req, res, next) {
    let lineGroupID = req.query.lineGroupID;

    if (lineGroupID == undefined || lineGroupID == null || lineGroupID == '') {
        console.log('Alert: The Data was empty or undefined"')
        res.status(400).json({
            message: "The Data was empty or undefined"
        })
    } else {
        let checkGroupRef = await db.collection('LineGroup').doc(lineGroupID);
        await checkGroupRef.get().then(async data => {
            if (data.exists) {
                const checkTripIDRef = db.collection('LineGroup').doc(lineGroupID).collection('Trip').where('tripStatus', '==', true);
                await checkTripIDRef.get().then(async snapshot => {
                    if (snapshot.empty) {
                        console.log('Alert: You do not have a trip')
                        return res.status(202).json({ message: 'You do not have a trip' });
                    } else {
                        let result = await getAllTripByGroupID(lineGroupID);
                        console.log('Alert: get trip list success')
                        return res.status(200).json(result);
                    }
                }).catch(err => {
                    console.log('Error: ', err);
                });
            } else {
                console.log('Alert: No Trip in the group , Please create trip.')
                return res.status(202).json({ message: 'No Trip in the group, Please create trip.' });
            }
        }).catch(err => {
            console.log('Error: ', err);
        });
    }
});

router.get('/tripperday', async function (req, res, next) {
    const lineGroupID = req.query.lineGroupID;
    const dateOfTrip = req.query.dateOfTrip + '';
    const tripIDList = [];

    if (lineGroupID == undefined || lineGroupID == null || lineGroupID == '' ||
        dateOfTrip == undefined || dateOfTrip == null || dateOfTrip == '') {
        console.log('Alert: The Data was empty or undefined"');
        return res.status(400).json({ message: "The Data was empty or undefined" });
    } else {
        const checkGroupRef = await db.collection('LineGroup').doc(lineGroupID);
        await checkGroupRef.get().then(async data => {
            if (data.exists) {
                const checkTripIDRef = db.collection('LineGroup').doc(lineGroupID).collection('Trip').where('tripStatus', '==', true);
                await checkTripIDRef.get().then(async snapshot => {
                    if (snapshot.empty) {
                        console.log('Alert: You do not have a trip');
                        return res.status(400).json({ message: "You do not have a trip" });
                    } else {
                        await snapshot.forEach(async doc => {
                            if (doc.exists) {
                                await tripIDList.push(doc.data());
                            }
                        })
                        let tripID = tripIDList.map(t => t.tripID).toString();
                        let showTripPerDay = db.collection('TripPerDay').doc(tripID).collection('Date').doc(dateOfTrip);
                        await showTripPerDay.get().then(async data => {
                            if (data.exists) {
                                const result = await getTripPerDayByDate(lineGroupID, dateOfTrip);
                                console.log('Alert: get Trip per day success')
                                return res.status(200).json(result);
                            } else {
                                console.log('Alert: You do not have plan for today');
                                return res.status(201).json({ message: "You do not have plan for today" });
                            }
                        });
                    }
                });
            } else {
                console.log('Alert: No Trip in the group , Please create trip.')
                return res.status(400).json({ message: "No Trip in the group, Please create trip." });
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
        datas.tripStatus == undefined || datas.tripStatus == null ||
        datas.totalDate == undefined || datas.totalDate == null || datas.totalDate == '') {
        res.status(400).json({
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
        datas.totalDate == undefined || datas.totalDate == null || datas.totalDate == '') {
        res.status(400).json({
            message: "The Data was empty or undefined"
        })
    } else {
        const checkPermissionRef = db.collection('TripList').where('tripID', '==', datas.tripID).where('ownerTrip', '==', datas.lineID);
        await checkPermissionRef.get().then(async data => {
            if (data.empty) {
                console.log('You do not have permission to update trip');
                res.status(400);
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
    let datas = req.query;
    if (datas.tripID == undefined || datas.tripID == null || datas.tripID == '' ||
        datas.lineID == undefined || datas.lineID == null || datas.lineID == '' ||
        datas.lineGroupID == undefined || datas.lineGroupID == null || datas.lineGroupID == '') {
        console.log('Alert: The Data was empty or undefined"')
        res.status(400).json({
            message: "The Data was empty or undefined"
        })
    } else {
        let checkPermission = db.collection('TripList').where('tripID', '==', datas.tripID).where('ownerTrip', '==', datas.lineID);
        await checkPermission.get().then(async data => {
            if (data.empty) {
                console.log("You do not have permission to delete trip")
                res.status(400).json({
                    message: "You do not have permission to delete trip"
                })
            } else {
                await deleteTrip(datas);
                res.status(200).json({
                    message: "Delete Trip Success"
                })
            }
        })
    }
});

router.get('/score', async function (req, res, next) {
    let lineID = req.query.lineID;
    let Score = await getScoreByID(lineID);
    res.status(200).json(Score);
});

router.post('/score', async function (req, res, next) {
    let datas = req.body;
    await saveScoreTrip(datas).then(() => {
        return res.status(201).json({
            message: "Done!"
        });
    });
});

router.get('/lastTrip', async function (req, res, next) {
    let lineGroupID = req.query.lineGroupID;
    let listResult = await getLastTrip(lineGroupID);
    res.status(200).json(listResult);
});

//---------------- Function ----------------//
async function getAllTripByGroupID(lineGroupID) {
    let dataTripAllDay = [];
    let dataTripList = [];
    let dataDateAll = [];
    let tripIDList = [];
    let checkTripIDRef = db.collection('LineGroup').doc(lineGroupID).collection('Trip').where('tripStatus', '==', true);
    await checkTripIDRef.get().then(async snapshot => {
        snapshot.forEach(doc => {
            tripIDList.push(doc.data());
        });

        let tripID = tripIDList.map(t => t.tripID).toString();
        let getAllTrip = db.collection('TripList').doc(tripID);
        await getAllTrip.get().then(async doc1 => {
            await dataTripList.push(doc1.data());
            let ownerTrip = dataTripList.map(ow => ow.ownerTrip).toString();
            let tripId = dataTripList.map(tid => tid.tripID).toString();
            let tripName = dataTripList.map(tn => tn.tripName).toString();
            let province = dataTripList.map(p => p.province).toString();
            let startDate = dataTripList.map(sd => sd.startDate).toString();
            let endDate = dataTripList.map(ed => ed.endDate).toString();
            let tripStatus = dataTripList.map(ts => ts.tripStatus).toString();

            let showAllTrip = db.collection('TripPerDay').doc(tripID).collection('Date');
            await showAllTrip.get().then(async snapshot => {
                await snapshot.forEach(async doc => {
                    dataDateAll.push(doc.data());
                })
            });
            let dataAll = {
                ownerTrip: ownerTrip,
                tripID: tripId,
                tripName: tripName,
                province: province,
                startDate: startDate,
                endDate: endDate,
                tripStatus: tripStatus,
                totalDate: dataDateAll
            }
            dataTripAllDay.push(dataAll);
        })
            .catch(err => {
                console.log('Error getting All Trip detail', err);
            });
    })
    return dataTripAllDay;
};

async function getTripPerDayByDate(lineGroupID, dateOfTrip) {
    let data_TripList_TripPerDay = [];
    let dataTripList = [];
    const dataTripPerDay = [];
    const tripIDList = [];
    const checkTripIDRef = db.collection('LineGroup').doc(lineGroupID).collection('Trip').where('tripStatus', '==', true);

    await checkTripIDRef.get().then(async snapshot => {
        await snapshot.forEach(doc => {
            tripIDList.push(doc.data());
        });

        let tripID = tripIDList.map(t => t.tripID).toString();
        let getAllTrip = db.collection('TripList').doc(tripID);
        await getAllTrip.get().then(async doc1 => {
            await dataTripList.push(doc1.data());
            let ownerTrip = dataTripList.map(ow => ow.ownerTrip).toString();
            let tripId = dataTripList.map(tid => tid.tripID).toString();
            let tripName = dataTripList.map(tn => tn.tripName).toString();
            let province = dataTripList.map(p => p.province).toString();
            let startDate = dataTripList.map(sd => sd.startDate).toString();
            let endDate = dataTripList.map(ed => ed.endDate).toString();
            let tripStatus = dataTripList.map(ts => ts.tripStatus).toString();

            const showTripPerDay = db.collection('TripPerDay');
            const queryTPD = showTripPerDay.doc(tripID).collection('Date').doc(dateOfTrip);
            await queryTPD.get().then(async doc => {
                await dataTripPerDay.push((doc.data()));
                let dataAll = {
                    ownerTrip: ownerTrip,
                    tripID: tripId,
                    tripName: tripName,
                    province: province,
                    startDate: startDate,
                    endDate: endDate,
                    tripStatus: tripStatus,
                    totalDate: dataTripPerDay
                }
                data_TripList_TripPerDay.push(dataAll);
            });
        })
            .catch(err => {
                console.log('Error getting All Trip detail', err);
            });
    })
    return data_TripList_TripPerDay;
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
        let CheckTripIDRef = db.collection('TripList');
        let tripID = 'T_' + id;
        let query = await CheckTripIDRef.doc(tripID).get()
            .then(doc => {
                if (!doc.exists) {
                    checkDocumentisEmpty = false;
                    result = 'T_' + id;
                }
            })
    } while (checkDocumentisEmpty == true)
    return result;
};

async function createTripList(datas) {
    let genTripID = await generateTripID();
    let CheckLineChatAccountRef = db.collection('LineChatAccount').doc(datas.lineID);
    await CheckLineChatAccountRef.get().then(async data => {
        // กรณี : User เคยใช้งาน Bot แล้ว(มี Account ในระบบ) และต้องการจะ Create Trip ใหม่
        if (data.exists) {
            await CheckLineChatAccountRef.update({
                lineID: datas.lineID,
                displayName: datas.displayName,
                pictureURL: datas.pictureURL
            })
            let saveTripIDinTripListRef = CheckLineChatAccountRef.collection('Group').doc(datas.lineGroupID);
            await saveTripIDinTripListRef.set({
                lineGroupID: datas.lineGroupID,
            })
            let saveGroupIDinGroupRef = db.collection('LineGroup').doc(datas.lineGroupID);
            await saveGroupIDinGroupRef.set({
                lineGroupID: datas.lineGroupID,
            })
            let saveTripIDinGroup = saveGroupIDinGroupRef.collection('Trip').doc(genTripID);
            await saveTripIDinGroup.set({
                tripID: genTripID,
                tripStatus: datas.tripStatus,
                createDate: datas.createDate
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
            })
            for (let i = 0; i <= 0; i++) {
                let count = (datas.totalDate.length) - 1;
                for (let j = 0; j <= count; j++) {
                    if (j <= count) {
                        let date = datas.totalDate[j].eventDate + '';
                        let dateSub = date.substring(0, 10);
                        let event = await datas.totalDate[j].event;
                        await db.collection('TripPerDay').doc(genTripID).collection('Date').doc(dateSub).set({
                            eventDate: dateSub,
                            events: event
                        })
                    } else {
                        console.log('Error create trip')
                    }
                }
            }
        } else {
            // กรณี : User ใหม่ที่ต้องการจะ Create Trip
            await CheckLineChatAccountRef.set({
                lineID: datas.lineID,
                displayName: datas.displayName,
                pictureURL: datas.pictureURL
            })
            let saveTripIDinTripListRef = CheckLineChatAccountRef.collection('Group').doc(datas.lineGroupID);
            await saveTripIDinTripListRef.set({
                lineGroupID: datas.lineGroupID,
            })
            let saveGroupIDinGroupRef = db.collection('LineGroup').doc(datas.lineGroupID);
            await saveGroupIDinGroupRef.set({
                lineGroupID: datas.lineGroupID,
            })
            let saveTripIDinGroup = saveGroupIDinGroupRef.collection('Trip').doc(genTripID);
            await saveTripIDinGroup.set({
                tripID: genTripID,
                tripStatus: datas.tripStatus
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
            })
            for (let i = 0; i <= 0; i++) {
                let count = (datas.totalDate.length) - 1;
                for (let j = 0; j <= count; j++) {
                    if (j <= count) {
                        let date = datas.totalDate[j].eventDate + '';
                        let dateSub = date.substring(0, 10);
                        let event = datas.totalDate[j].event;
                        await db.collection('TripPerDay').doc(genTripID).collection('Date').doc(dateSub).set({
                            eventDate: dateSub,
                            events: event
                        })
                    } else {
                        console.log('Error create trip loop')
                    }
                }
            }
        }
    })
};

async function updateTrip(datas) {
    let CheckLineChatAccountRef = await db.collection('LineChatAccount').doc(datas.lineID);
    await CheckLineChatAccountRef.get().then(async data => {
        if (data.exists) {
            await CheckLineChatAccountRef.update({
                lineID: datas.lineID,
                displayName: datas.displayName,
                pictureURL: datas.pictureURL
            });
            let CheckLineGroupinLineChatAccount = CheckLineChatAccountRef.collection('Group').doc(datas.lineGroupID);
            await CheckLineGroupinLineChatAccount.get().then(async data => {
                if (data.exists) {
                    let CheckTripRef = db.collection('LineGroup').doc(datas.lineGroupID);
                    await CheckTripRef.get().then(async data => {
                        if (data.exists) {
                            let CheckTripinLineGroup = await CheckTripRef.collection('Trip').doc(datas.tripID);
                            await CheckTripinLineGroup.get().then(async data => {
                                if (data.exists) {
                                    let CheckTripListRef = db.collection('TripList').doc(datas.tripID);
                                    await CheckTripListRef.get().then(async data => {
                                        if (data.exists) {
                                            await CheckTripListRef.update({
                                                tripName: datas.tripName,
                                                province: datas.province,
                                                startDate: datas.startDate,
                                                endDate: datas.endDate
                                            });
                                            let count = (datas.totalDate.length) - 1;
                                            for (let j = 0; j <= count; j++) {
                                                if (j <= count) {
                                                    let date = await datas.totalDate[j].eventDate;
                                                    let event = await datas.totalDate[j].events;
                                                    await db.collection('TripPerDay').doc(datas.tripID).collection('Date').doc(date).update({
                                                        eventDate: date,
                                                        events: event
                                                    })
                                                } else {
                                                    console.log('Error update trip loop')
                                                }
                                            }
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
    let getDate = [];
    const GetDateInTripPerDay = db.collection('TripPerDay').doc(datas.tripID).collection('Date');
    await GetDateInTripPerDay.get().then(async data => {
        if (data.empty) {
            console.log('No matching documents.');
            return;
        } else {
            data.forEach(async f => {
                await getDate.push(f.id);
            });

            let DateCount = (getDate.length);

            for (i = DateCount; i <= DateCount; i--) {
                if (i > 0) {
                    let DateID = (getDate[i - 1]);
                    let DateIDString = DateID.toString();
                    await db.collection('TripPerDay').doc(datas.tripID).collection('Date').doc(DateIDString).delete();
                } else {
                    return;
                }
            }
        }
    });
    await db.collection('TripPerDay').doc(datas.tripID).delete()
        .then(function () {
            console.log("Trip successfully deleted!");
        }).catch(function (error) {
            console.error("Error deleted document trip: ", error);
        });
};

async function getScoreByID(lineID) {
    let scoreList = [];
    let getScoreByID = db.collection('AccountProfile').doc(lineID).collection('Score').doc(lineID);
    await getScoreByID.get().then(async doc => {
        scoreList.push(doc.data());
    });
    return scoreList;
};

async function saveScoreTrip(datas) {
    let preparation = datas.preparation;
    let entertainment = datas.entertainment;
    let value = datas.value;
    let lineID = datas.lineID;
    let scoreList = [];

    let saveScoreRef = db.collection('AccountProfile').doc(lineID).collection('Score').doc(lineID);
    await saveScoreRef.get().then(doc => {
        scoreList.push(doc.data());
    });

    let old_preparation = parseInt(scoreList.map(p => p.preparationScore));
    let old_entertainment = parseInt(scoreList.map(w => w.entertainmentScore));
    let old_value = parseInt(scoreList.map(f => f.worthinessScore));
    let count = parseInt(scoreList.map(c => c.countOfSubmit));

    let new_preparation = old_preparation + preparation;
    let new_entertainment = old_entertainment + entertainment;
    let new_value = old_value + value;
    let new_count = count + 1;

    await saveScoreRef.update({
        preparationScore: new_preparation,
        entertainmentScore: new_entertainment,
        worthinessScore: new_value,
        countOfSubmit: new_count
    });
};

async function getLastTrip(lineGroupID) {
    let list = [];
    let listResult = [];
    let resultRef = db.collection('LineGroup').doc(lineGroupID).collection('Trip').orderBy('createDate', 'desc');
    await resultRef.get().then(async snapshot => {
        snapshot.forEach(async doc => {
            list.push(doc.data());
        });
    });
    let tripID = list.map(t => t.tripID);
    let tripIDString = tripID[0].toString();

    let result = db.collection('TripList').doc(tripIDString);
    await result.get().then(doc => {
        listResult.push(doc.data());
    });
    return listResult;
}

module.exports = router;
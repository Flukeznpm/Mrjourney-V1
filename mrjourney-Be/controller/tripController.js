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
        res.status(400).json({
            message: "The Data was empty or undefined"
        })
    } else {
        let checkGroupRef = await db.collection('LineGroup').doc(lineGroupID);
        checkGroupRef.get().then(async data => {
            if (data.exists) {
                let checkUserRef = await checkGroupRef.collection('Members').doc(lineID);
                await checkUserRef.get().then(async data => {
                    if (data.exists) {
                        const checkTripIDRef = db.collection('LineGroup').doc(lineGroupID).collection('Trip').where('tripStatus', '==', true);
                        await checkTripIDRef.get().then(async snapshot => {
                            if (snapshot.empty) {
                                console.log('Alert: You do not have to create trip')
                                const message = "You do not have to create trip"
                                res.status(400).json(message);
                            } else {
                                let result = await getAllTripByGroupID(lineGroupID);
                                console.log('Alert: get Trip list success')
                                console.log(result)
                                res.status(200).json(result);
                            }
                        });
                    } else {
                        console.log('Alert: You cannot check this Trip')
                        let message = "You cannot check this Trip"
                        res.status(400).json(message);
                    }
                })
            } else {
                console.log('Alert: No Trip in the group , Please create trip.')
                let message = "No Trip in the group , Please create trip."
                res.status(400).json(message);
            }
        })
    }
});

router.get('/tripperday', async function (req, res, next) {
    const lineGroupID = req.query.lineGroupID;
    const lineID = req.query.lineID;
    const dateOfTrip = req.query.dateOfTrip + '';
    dateOfTrip.substring(0, 10)
    console.log('Date: ', dateOfTrip)

    if (lineGroupID == undefined || lineGroupID == null || lineGroupID == '' ||
        lineID == undefined || lineID == null || lineID == '' ||
        dateOfTrip == undefined || dateOfTrip == null || dateOfTrip == '') {
        console.log('Alert: The Data was empty or undefined"')
        res.status(400).json({
            message: "The Data was empty or undefined"
        })
    } else {
        const checkGroupRef = await db.collection('LineGroup').doc(lineGroupID);
        await checkGroupRef.get().then(async data => {
            if (data.exists) {
                const checkUserRef = await checkGroupRef.collection('Members').doc(lineID);
                await checkUserRef.get().then(async data => {
                    if (data.exists) {
                        const checkTripIDRef = db.collection('LineGroup').doc(lineGroupID).collection('Trip').where('tripStatus', '==', true);
                        await checkTripIDRef.get().then(async snapshot => {
                            if (snapshot.empty) {
                                console.log('Alert: You do not have to create trip')
                                const message = "You do not have to create trip"
                                res.status(400).json(message);
                            } else {
                                const result = await getTripPerDayByDate(lineGroupID, dateOfTrip);
                                // if(result.events == undefined){
                                //     console.log('Alert: No date in the event')
                                //     res.status(400);
                                // }
                                console.log('Alert: get Trip per day success')
                                console.log(result)
                                res.status(200).json(result);
                            }
                        });
                    } else {
                        console.log('Alert: You cannot check this Trip per day')
                        const message = "You cannot check this Trip per day"
                        res.status(400).json(message);
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
        datas.totalDate == undefined || datas.totalDate == null || datas.totalDate == false) {
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
        datas.tripStatus == undefined || datas.tripStatus == null || datas.tripStatus == false ||
        datas.totalDate == undefined || datas.totalDate == null || datas.totalDate == false) {
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
    let datas = req.body;
    if (datas.tripID == undefined || datas.tripID == null || datas.tripID == '') {
        console.log('Alert: The Data was empty or undefined"')
        res.status(400).json({
            message: "The Data was empty or undefined"
        })
    } else {
        let checkPermission = db.collection('TripList').where('tripID', '==', datas.tripID).where('ownerTrip', '==', datas.ownerTrip);
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

//---------------- Function ----------------//
async function getAllTripByGroupID(lineGroupID) {
    let dataTripAllDay = [];
    let tripIDList = [];
    let checkTripIDRef = db.collection('LineGroup').doc(lineGroupID).collection('Trip').where('tripStatus', '==', true);

    await checkTripIDRef.get().then(snapshot => {
        snapshot.forEach(doc => {
            tripIDList.push(doc.data());
        })
    })

    let tripID = tripIDList.map(t => t.tripID).toString();

    let getAllTrip = db.collection('TripList').doc(tripID);
    await getAllTrip.get().then(doc => {
        dataTripAllDay.push(doc.data());
    });

    let showAllTrip = db.collection('TripPerDay').doc(tripID).collection('Date');
    await showAllTrip.get().then(async snapshot => {
        snapshot.forEach(async doc => {
            let dataDate = {
                Date: doc.id,
                events: doc.data()
            }
            await dataTripAllDay.push((dataDate));
        })
    })
        .catch(err => {
            console.log('Error getting All Trip detail', err);
        });

    return dataTripAllDay;
};

async function getTripPerDayByDate(lineGroupID, dateOfTrip) {
    const dataTripPerDay = [];
    const tripIDList = [];
    const checkTripIDRef = db.collection('LineGroup').doc(lineGroupID).collection('Trip').where('tripStatus', '==', true);

    await checkTripIDRef.get().then(snapshot => {
        snapshot.forEach(doc => {
            tripIDList.push(doc.data());
        })
    })

    let tripID = tripIDList.map(t => t.tripID).toString();
    // console.log('TripID: ', tripID);
    // console.log('Date: ', dateOfTrip)

    let getAllTrip = db.collection('TripList').doc(tripID);
    await getAllTrip.get().then(doc => {
        dataTripPerDay.push(doc.data());
    });

    const showTripPerDay = db.collection('TripPerDay');
    const queryTPD = showTripPerDay.doc(tripID).collection('Date').doc(dateOfTrip);

    await queryTPD.get().then(async res => {
        if (queryTPD.empty) {
            console.log('No matching documents.');
            return;
        } else {
            let dataDate = {
                Date: res.id,
                events: res.data()
            }
            await dataTripPerDay.push((dataDate));
        }
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
        let CheckTripIDRef = db.collection('TripList');
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
            let saveMemberinGroup = saveGroupIDinGroupRef.collection('Members').doc(datas.lineID);
            await saveMemberinGroup.set({
                lineID: datas.lineID
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
            // for (let i = 0; i <= 0; i++) {
            //     let count = (datas.totalDate.length) - 1;
            //     for (let j = 0; j <= count; j++) {
            //         if (j <= count) {
            //             let date = await datas.totalDate[j].eventDate;
            //             let eventName = await datas.totalDate[j].event[i].eventName;
            //             let startEvent = await datas.totalDate[j].event[i].startEvent;
            //             let endEvent = await datas.totalDate[j].event[i].endEvent;
            //             let eventType = await datas.totalDate[j].event[i].eventType;
            //             await db.collection('TripPerDay').doc(genTripID).collection('Date').doc(date).set({
            //                 eventName: eventName,
            //                 startEvent: startEvent,
            //                 endEvent: endEvent,
            //                 eventType: eventType
            //             })
            //         } else {
            //             console.log('Error create trip')
            //         }
            //     } //loop1
            // } //loop2
            for (let i = 0; i <= 0; i++) {
                let count = (datas.totalDate.length) - 1;
                for (let j = 0; j <= count; j++) {
                    if (j <= count) {
                        let date = datas.totalDate[j].eventDate + '';
                        // console.log('date: ', date)
                        let dateSub = date.substring(0, 10);
                        // console.log('dateSub: ', dateSub)
                        let event = await datas.totalDate[j].event;
                        // let eventName = await datas.totalDate[j].event[i].eventName;
                        // let startEvent = await datas.totalDate[j].event[i].startEvent;
                        // let endEvent = await datas.totalDate[j].event[i].endEvent;
                        // let eventType = await datas.totalDate[j].event[i].eventType;
                        await db.collection('TripPerDay').doc(genTripID).collection('Date').doc(dateSub).set({
                            event: event
                        })
                    } else {
                        console.log('Error create trip')
                    }
                } //loop1
            } //loop2
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
            let saveMemberinGroup = saveGroupIDinGroupRef.collection('Members').doc(datas.lineID);
            await saveMemberinGroup.set({
                lineID: datas.lineID
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
            // for (let i = 0; i <= 0; i++) {
            //     let count = (datas.totalDate.length) - 1;
            //     for (let j = 0; j <= count; j++) {
            //         if (j <= count) {
            //             let date = await datas.totalDate[j].eventDate;
            //             let eventName = await datas.totalDate[j].event[i].eventName;
            //             let startEvent = await datas.totalDate[j].event[i].startEvent;
            //             let endEvent = await datas.totalDate[j].event[i].endEvent;
            //             let eventType = await datas.totalDate[j].event[i].eventType;
            //             await db.collection('TripPerDay').doc(genTripID).collection('Date').doc(date).set({
            //                 eventName: eventName,
            //                 startEvent: startEvent,
            //                 endEvent: endEvent,
            //                 eventType: eventType
            //             })
            //         } else {
            //             console.log('Error create trip')
            //         }
            //     } //loop1
            // } //loop2
            for (let i = 0; i <= 0; i++) {
                let count = (datas.totalDate.length) - 1;
                for (let j = 0; j <= count; j++) {
                    if (j <= count) {
                        let date = datas.totalDate[j].eventDate + '';
                        // console.log('date: ', date)
                        let dateSub = date.substring(0, 10);
                        // console.log('dateSub: ', dateSub)
                        let event = datas.totalDate[j].event;
                        // let eventName = await datas.totalDate[j].event[i].eventName;
                        // let startEvent = await datas.totalDate[j].event[i].startEvent;
                        // let endEvent = await datas.totalDate[j].event[i].endEvent;
                        // let eventType = await datas.totalDate[j].event[i].eventType;
                        await db.collection('TripPerDay').doc(genTripID).collection('Date').doc(dateSub).set({
                            event: event
                        })
                    } else {
                        console.log('Error create trip loop')
                    }
                } //loop1
            } //loop2
        }
    })
};

async function updateTrip(datas) {
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
                                            await CheckTripListRef.update({
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
                                                        totalDate: datas.totalDate
                                                    })
                                                    for (let i = 0; i <= 0; i++) {
                                                        let count = (datas.totalDate.length) - 1;
                                                        for (let j = 0; j <= count; j++) {
                                                            if (j <= count) {
                                                                let date = await datas.totalDate[j].eventDate;
                                                                let event = await datas.totalDate[j].event;
                                                                // let eventName = await datas.totalDate[j].event[i].eventName;
                                                                // let startEvent = await datas.totalDate[j].event[i].startEvent;
                                                                // let endEvent = await datas.totalDate[j].event[i].endEvent;
                                                                // let eventType = await datas.totalDate[j].event[i].eventType;
                                                                await db.collection('TripPerDay').doc(datas.tripID).collection('Date').doc(date).update({
                                                                    event: event
                                                                })
                                                            } else {
                                                                console.log('Error update trip loop')
                                                            }
                                                        } //loop1
                                                    } //loop2
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

    let getMemberID = [];
    const GetMemberFromLineGroupRef = db.collection('LineGroup').doc(datas.lineGroupID).collection('Members');
    await GetMemberFromLineGroupRef.get().then(async data => {
        if (data.empty) {
            console.log('No matching documents.');
            return;
        } else {
            data.forEach(async f => {
                await getMemberID.push(f.data());
            });

            let MemberIDArray = await getMemberID.map(r => r.lineID);
            // console.log('MemberIDArray: ', MemberIDArray)
            let MemberIDCount = (MemberIDArray.length);
            // console.log('MemberIDCount: ', MemberIDCount)

            for (i = MemberIDCount; i <= MemberIDCount; i--) {
                if (i > 0) {
                    let MembersID = (MemberIDArray[i - 1]);
                    let MembersIDString = MembersID.toString();
                    // console.log('MembersID loop: ', MembersID);
                    await db.collection('LineGroup').doc(datas.lineGroupID).collection('Members').doc(MembersIDString).delete();
                } else {
                    return;
                }
            }
        }
    });

    await db.collection('LineGroup').doc(datas.lineGroupID).delete();
    await db.collection('LineChatAccount').doc(datas.lineID).collection('Group').doc(datas.lineGroupID).delete();
    await db.collection('TripPerDay').doc(datas.lineGroupID).delete()
        .then(function () {
            console.log("Trip successfully deleted!");
        }).catch(function (error) {
            console.error("Error deleted document trip: ", error);
        });
};

async function setTripHistory(datas) {

};

module.exports = router;
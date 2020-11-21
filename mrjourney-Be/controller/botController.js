var express = require('express');
var firebase = require('firebase-admin');
const { firestore } = require('firebase-admin');
let db = firebase.firestore();
const https = require('https');
const axios = require('axios');

async function checkTripAvaliable(data) {
    let status = false;
    const checkTripIDRef = db.collection('LineGroup').doc(data).collection('Trip').where('tripStatus', '==', true);
    await checkTripIDRef.get().then(async snapshot => {
        if (snapshot.empty) {
            status = false;
        } else {
            status = true;
        }
    })
    return status;
};

async function checkOwnerTrip(groupId, userId) {
    let status = false;
    let checkTripRef = await getLastTrip(groupId);
    let tripID = checkTripRef.map(e => e.tripID)
    let toStringID = tripID.toString()

    let checkUserRef = db.collection('TripList').where('tripID', '==', toStringID).where('ownerTrip', '==', userId);
    await checkUserRef.get().then(async doc => {
        if (doc.empty) {
            status = false;
        } else {
            let checkAccRef = db.collection('AccountProfile').doc(userId);
            await checkAccRef.get().then(async snapshot => {
                if (snapshot.exists) {
                    status = true;
                } else {
                    status = false;
                }
            })
        }
    });
    return status;
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

async function checkPayBill(lineGroupID) {
    let billRef = await getBill(lineGroupID);
    let billResult = billRef[0]
    return billResult;
};

async function getBill(lineGroupID) {
    let billNoList = [];
    let billIDList = [];
    let userList = [];
    let result = [];

    let checkBill = db.collection('Bill').doc(lineGroupID);
    await checkBill.get().then(async doc => {
        console.log('1');
        if (doc.exists) {
            let getAllBill = db.collection('Bill').doc(lineGroupID).collection('BillNo');
            await getAllBill.get().then(async snapshot => {
                snapshot.forEach(doc => {
                    billNoList.push(doc.data());
                    billIDList.push(doc.id);
                });
            });

            let billNo = billIDList.toString();
            let ownerName = billNoList.map(o => o.ownerName).toString();
            let totalCost = billNoList.map(t => t.totalCost).toString();
            let ownerBillID = billNoList.map(t => t.ownerBillID).toString();
            let receivingAccount = billNoList.map(t => t.receivingAccount).toString();
            let bankName = billNoList.map(t => t.bankName).toString();
            let payMentNumber = billNoList.map(t => t.payMentNumber).toString();
            let billName = billNoList.map(t => t.billName).toString();

            let getUser = getAllBill.doc(billNo).collection('User');
            await getUser.get().then(async snapshot => {
                await snapshot.forEach(async doc => {
                    userList.push(doc.data());
                })
            });

            let returnData = {
                billNo: billNo,
                totalCost: totalCost,
                ownerName: ownerName,
                ownerBillID: ownerBillID,
                receivingAccount: receivingAccount,
                bankName: bankName,
                payMentNumber: payMentNumber,
                billName: billName,
                user: userList
            }
            await result.push(returnData);
            console.log('res', result);
        }
    });
    console.log('res', result);
    return result
}

async function checkTripPerDay(lineGroupID) {
    let currentDate = new Date();
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(currentDate);
    const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(currentDate);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(currentDate);
    let date = `${ye}-${mo}-${da}`
    let perDayRef = await getTripPerDayByDate(lineGroupID, date);
    let perDayResult = perDayRef[0]
    return perDayResult;
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

async function checkWeather(province) {
    if (province === 'กรุงเทพมหานคร') {
        const weatherRef = await getWeatherBkk(province);
        const weatherResult = weatherRef.WeatherForecasts[0]
        return weatherResult;
    } else {
        const weatherRef = await getWeather(province);
        const weatherResult = weatherRef.WeatherForecasts[0]
        return weatherResult;
    }
}

async function getWeather(province) {
    const currentDate = new Date();
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(currentDate);
    const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(currentDate);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(currentDate);
    let dateFormat = `${ye}-${mo}-${da}`
    let amphoe = 'เมือง' + province;
    console.log('dateFormat', dateFormat);
    const headers = {
        'Content-Type': 'application/json, text/json',
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImNlYjI0N2Y5YmJjMDRlNjk0ZDAyNjMyMDIyZmEwYWY0ZjNlYjU1MTZiNjVmZjllNTg5YTkzZGUyNjFlZmM5NzMwMTdjMzc2OTQxMmI2YjljIn0.eyJhdWQiOiIyIiwianRpIjoiY2ViMjQ3ZjliYmMwNGU2OTRkMDI2MzIwMjJmYTBhZjRmM2ViNTUxNmI2NWZmOWU1ODlhOTNkZTI2MWVmYzk3MzAxN2MzNzY5NDEyYjZiOWMiLCJpYXQiOjE2MDUxMjQyMzAsIm5iZiI6MTYwNTEyNDIzMCwiZXhwIjoxNjM2NjYwMjMwLCJzdWIiOiI5NzkiLCJzY29wZXMiOltdfQ.bUEK9H2ZEG7JzOKJ1YPKEHnxGLUVrD1InK-B6vqvpt-Ug6CvTtVcqY0Ppb4YQmJ_5-5vNwruB-LRfQj563lLjlqCbBmkudKoLE6ogA2xZGPmZoxeAQ2lhweWlwSJrxfXAI9A8KExwavFXQUPHDgkY4hx5Dqyakxbr_AHtQYNOY0wJugDiw9Zoty-SCbz9inWBZ69aSY590VF0Znf8UyFhIAUkj8ku5q44Kn0oB1YafHaJi4WFWoJBTEsp4ZOFkKI8auxH88hVqxr7oZzEDjoX0W7xagMb5hECFA9MSl5UO_-3TE2AS5WXdtnU2e8s9W22Zo_VpPwSdcVrCplF90JXXH3LC0MenlSpIgO4wpL2cg7DEfzyQPdaW7ZIoONea_FuMAq9-kcoU0QLOn9c-Wgv3ikTOzYisGCLSxXv2Zz1t0FgM86vKsdPd_3pvw4YR3qOvKPtlvHPv4uAXm0SXtAiABlibmXeAHZTkQ8tGn3bN-GFouUrbfYVeUIdrTdFAPIMyefbgdVjSK2ZHbWOx1UwXZM4FivwPKYaEhXf_2wOTfF424XcVZtcxX8HCPnCXVXSIVtMn9LXe6SZDLCEERYbRJ38AP8Pv2XlkUfCkJBIewfs5ttuj-kU2adHgzbtAx571ihsb1-Rh4W_mMr3NxUFrx3mls79qrW5EA7gLS7hhM',
        'accept': 'application/json'
    }

    let url = encodeURI(`https://data.tmd.go.th/nwpapi/v1/forecast/location/daily/place?province=${province}&amphoe=${amphoe}&fields=tc_max,rh&date=${dateFormat}&duration=1`)

    return new Promise(async (resolve, reject) => {
        await axios.get(url, { headers: headers })
            .then(res => {
                console.log('res', res.data);
                resolve(res.data);
            }).catch(e => {
                console.log('e: ', e);
                resolve({});
            });
    });
};

async function getWeatherBkk(province) {
    const currentDate = new Date();
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(currentDate);
    const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(currentDate);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(currentDate);
    let dateFormat = `${ye}-${mo}-${da}`
    let amphoe = 'ทุ่งครุ'
    console.log('dateFormat', dateFormat);
    const headers = {
        'Content-Type': 'application/json, text/json',
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImNlYjI0N2Y5YmJjMDRlNjk0ZDAyNjMyMDIyZmEwYWY0ZjNlYjU1MTZiNjVmZjllNTg5YTkzZGUyNjFlZmM5NzMwMTdjMzc2OTQxMmI2YjljIn0.eyJhdWQiOiIyIiwianRpIjoiY2ViMjQ3ZjliYmMwNGU2OTRkMDI2MzIwMjJmYTBhZjRmM2ViNTUxNmI2NWZmOWU1ODlhOTNkZTI2MWVmYzk3MzAxN2MzNzY5NDEyYjZiOWMiLCJpYXQiOjE2MDUxMjQyMzAsIm5iZiI6MTYwNTEyNDIzMCwiZXhwIjoxNjM2NjYwMjMwLCJzdWIiOiI5NzkiLCJzY29wZXMiOltdfQ.bUEK9H2ZEG7JzOKJ1YPKEHnxGLUVrD1InK-B6vqvpt-Ug6CvTtVcqY0Ppb4YQmJ_5-5vNwruB-LRfQj563lLjlqCbBmkudKoLE6ogA2xZGPmZoxeAQ2lhweWlwSJrxfXAI9A8KExwavFXQUPHDgkY4hx5Dqyakxbr_AHtQYNOY0wJugDiw9Zoty-SCbz9inWBZ69aSY590VF0Znf8UyFhIAUkj8ku5q44Kn0oB1YafHaJi4WFWoJBTEsp4ZOFkKI8auxH88hVqxr7oZzEDjoX0W7xagMb5hECFA9MSl5UO_-3TE2AS5WXdtnU2e8s9W22Zo_VpPwSdcVrCplF90JXXH3LC0MenlSpIgO4wpL2cg7DEfzyQPdaW7ZIoONea_FuMAq9-kcoU0QLOn9c-Wgv3ikTOzYisGCLSxXv2Zz1t0FgM86vKsdPd_3pvw4YR3qOvKPtlvHPv4uAXm0SXtAiABlibmXeAHZTkQ8tGn3bN-GFouUrbfYVeUIdrTdFAPIMyefbgdVjSK2ZHbWOx1UwXZM4FivwPKYaEhXf_2wOTfF424XcVZtcxX8HCPnCXVXSIVtMn9LXe6SZDLCEERYbRJ38AP8Pv2XlkUfCkJBIewfs5ttuj-kU2adHgzbtAx571ihsb1-Rh4W_mMr3NxUFrx3mls79qrW5EA7gLS7hhM',
        'accept': 'application/json'
    }

    let url = encodeURI(`https://data.tmd.go.th/nwpapi/v1/forecast/location/daily/place?province=${province}&amphoe=${amphoe}&fields=tc_max,rh&date=${dateFormat}&duration=1`)

    return new Promise(async (resolve, reject) => {
        await axios.get(url, { headers: headers })
            .then(res => {
                console.log('res', res.data);
                resolve(res.data);
            }).catch(e => {
                console.log('e: ', e);
                resolve({});
            });
    });
};

async function RecommendEat(province) {
    const recommendRef = await getLocationEat(province);
    const recommendResult = recommendRef.result
    return recommendResult;
};

async function RecommendTravel(province) {
    const recommendRef = await getLocationTravel(province);
    const recommendResult = recommendRef.result
    return recommendResult;
};

async function RecommendSleep(province) {
    const recommendRef = await getLocationSleep(province);
    const recommendResult = recommendRef.result
    return recommendResult;
};

async function getLocationEat(province) {
    const headers = {
        'Content-Type': 'application/json, text/json',
        'Authorization': 'Bearer G6PJYs30zPWoS0O3tAWzXTIUa4OnayhOu7J2CxyY3Dfdsh0vOMjd)S)nxCBEs1OxwZGITATS6RmMQb31o2HLyh0=====2',
        'Accept-Language': 'th'
    }

    let url = encodeURI(`https://tatapi.tourismthailand.org/tatapi/v5/places/search?categorycodes=RESTAURANT&provincename=${province}&numberofresult=5`)

    return new Promise(async (resolve, reject) => {
        await axios.get(url, { headers: headers })
            .then(res => {
                resolve(res.data);
            }).catch(e => {
                // console.log('e: ', e);
                resolve({});
            });
    });
};

async function getLocationTravel(province) {
    const headers = {
        'Content-Type': 'application/json, text/json',
        'Authorization': 'Bearer G6PJYs30zPWoS0O3tAWzXTIUa4OnayhOu7J2CxyY3Dfdsh0vOMjd)S)nxCBEs1OxwZGITATS6RmMQb31o2HLyh0=====2',
        'Accept-Language': 'th'
    }

    let url = encodeURI(`https://tatapi.tourismthailand.org/tatapi/v5/places/search?categorycodes=ATTRACTION&provincename=${province}&numberofresult=5`)

    return new Promise(async (resolve, reject) => {
        await axios.get(url, { headers: headers })
            .then(res => {
                resolve(res.data);
            }).catch(e => {
                // console.log('e: ', e);
                resolve({});
            });
    });
};

async function getLocationSleep(province) {
    const headers = {
        'Content-Type': 'application/json, text/json',
        'Authorization': 'Bearer G6PJYs30zPWoS0O3tAWzXTIUa4OnayhOu7J2CxyY3Dfdsh0vOMjd)S)nxCBEs1OxwZGITATS6RmMQb31o2HLyh0=====2',
        'Accept-Language': 'th'
    }

    let url = encodeURI(`https://tatapi.tourismthailand.org/tatapi/v5/places/search?categorycodes=ACCOMMODATION&provincename=${province}&numberofresult=5`)

    return new Promise(async (resolve, reject) => {
        await axios.get(url, { headers: headers })
            .then(res => {
                resolve(res.data);
            }).catch(e => {
                // console.log('e: ', e);
                resolve({});
            });
    });
};


module.exports = { checkTripAvaliable, checkOwnerTrip, RecommendEat, RecommendTravel, RecommendSleep, checkWeather, checkPayBill, checkTripPerDay };
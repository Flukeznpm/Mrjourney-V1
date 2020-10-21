const { response } = require('express');
var express = require('express');
var router = express.Router();
const request = require('request');

router.post('/webhook', (req, res) => {
    let reply_token = req.body.events[0].replyToken
    // let msg = req.body.events[0]
    let msg = req.body.events[0].message.text
    // if (msg.type === "message" && msg.message.type === "text") {
    if (msg === "อาจารย์โอ๋") {
        replyProfessor(reply_token, msg)
    }
    else if (msg === "#สร้างทริป") {
        replyCreate(reply_token, msg)
    }
    else if (msg === "#ดูแผน") {
        replyPlan(reply_token, msg)
    }
    else if (msg === "ดูแผนทั้งหมด") {
        replyPlanAll(reply_token, msg)
    }
    else if (msg === "ดูแผนวันนี้") {
        replyPlanPerDay(reply_token, msg)
    }
    else if (msg === "#ช่วย") {
        replyHelp(reply_token, msg)
    }
    else if (msg === "วิธีการสร้างทริป") {
        replyHelpCreateTrip(reply_token, msg)
    }
    else if (msg === "วิธีการดูแผน") {
        replyHelpPlan(reply_token, msg)
    }
    else if (msg === "วิธีการจัดการบิล") {
        replyHelpBill(reply_token, msg)
    }
    else if (msg === "#แนะนำ") {
        replyRecommend(reply_token, msg)
    }
    else if (msg === "ที่กิน") {
        replyRecommendEat(reply_token, msg)
    }
    else if (msg === "ที่เที่ยว") {
        replyRecommendTravel(reply_token, msg)
    }
    else if (msg === "ที่พัก") {
        replyRecommendSleep(reply_token, msg)
    }
    else if (msg === "#อากาศ") {
        replyWeather(reply_token, msg)
    }
    // get locations here
    else if (msg === "#ติดต่อ") {
        replyContact(reply_token, msg)
    }
    else if (msg === "#บิล") {
        replyBill(reply_token, msg)
    }
    else if (msg === "#สร้างบิล") {
        replyCreateBill(reply_token, msg)
    }
    else if (msg === "#ดูบิล") {
        replySeeBill(reply_token, msg)
    }
    else if (msg === "#location") {
        reply(req)
    }
    // else if (ev) {
    //     replyWeatherMaps(reply_token, msg)
    // }
    // else {
    //     replyBased(reply_token, msg)
    // }

    // reply(req)
    res.sendStatus(200)
})

//-------------------------------function-------------------------------//
const reply = req => {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {EUEqmnC5MpIHn7O3gS9uJ2AJBVt7JCotZj/+t2hOOlBTt7b/+4nPAg/9BFeRawRghXeIeqZe5EMVIexmmEh5c80nwP+BMli10YB6vNFLl38OHFljNNNy1jS9Ft52GmAIUro72i8ebhHfzD9mN9CX1QdB04t89/1O/w1cDnyilFU=}'
    }
    let body = JSON.stringify({
        replyToken: req.body.events[0].replyToken,
        messages: [
            {
                type: "text",
                text: JSON.stringify(req.body)
            }
        ]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
};

function replyBased(reply_token, msg) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {EUEqmnC5MpIHn7O3gS9uJ2AJBVt7JCotZj/+t2hOOlBTt7b/+4nPAg/9BFeRawRghXeIeqZe5EMVIexmmEh5c80nwP+BMli10YB6vNFLl38OHFljNNNy1jS9Ft52GmAIUro72i8ebhHfzD9mN9CX1QdB04t89/1O/w1cDnyilFU=}'
    }

    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [
            {
                type: 'text',
                text: 'ส่งอะไรมาน้าาาา ผมไม่รู้คับ ฮือ ;_; '
            }
        ]
    })

    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}

function replyProfessor(reply_token, msg) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {EUEqmnC5MpIHn7O3gS9uJ2AJBVt7JCotZj/+t2hOOlBTt7b/+4nPAg/9BFeRawRghXeIeqZe5EMVIexmmEh5c80nwP+BMli10YB6vNFLl38OHFljNNNy1jS9Ft52GmAIUro72i8ebhHfzD9mN9CX1QdB04t89/1O/w1cDnyilFU=}'
    }

    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [
            {
                type: 'text',
                text: '♥'
            }
        ]
    })

    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}

function replyCreate(reply_token, msg) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {EUEqmnC5MpIHn7O3gS9uJ2AJBVt7JCotZj/+t2hOOlBTt7b/+4nPAg/9BFeRawRghXeIeqZe5EMVIexmmEh5c80nwP+BMli10YB6vNFLl38OHFljNNNy1jS9Ft52GmAIUro72i8ebhHfzD9mN9CX1QdB04t89/1O/w1cDnyilFU=}'
    }

    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [
            {
                type: 'text',
                text: msg
            },
            {
                type: "flex",
                altText: "Flex Message",
                contents: {
                    type: "bubble",
                    body: {
                        layout: "vertical",
                        contents: [
                            {
                                type: "text",
                                align: "center",
                                weight: "bold",
                                text: "พร้อมที่จะสร้างทริปแล้วใช่ไหม?"
                            }
                        ],
                        type: "box"
                    },
                    direction: "ltr",
                    footer: {
                        type: "box",
                        layout: "vertical",
                        contents: [
                            {
                                action: {
                                    label: "สร้างทริป",
                                    type: "uri",
                                    uri: "https://liff.line.me/1653975470-jV83lv9w"
                                },
                                type: "button",
                                color: "#C25738",
                                height: "sm",
                                margin: "xs",
                                style: "primary"
                            }
                        ]
                    }
                }
            }
        ]
    })

    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}

function replyPlan(reply_token, msg) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {EUEqmnC5MpIHn7O3gS9uJ2AJBVt7JCotZj/+t2hOOlBTt7b/+4nPAg/9BFeRawRghXeIeqZe5EMVIexmmEh5c80nwP+BMli10YB6vNFLl38OHFljNNNy1jS9Ft52GmAIUro72i8ebhHfzD9mN9CX1QdB04t89/1O/w1cDnyilFU=}'
    }

    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [
            {
                type: 'text',
                text: msg
            },
            {
                type: "flex",
                altText: "Flex Message",
                contents: {
                    type: "bubble",
                    body: {
                        layout: "vertical",
                        contents: [
                            {
                                type: "text",
                                align: "center",
                                weight: "bold",
                                text: "อยากดูแบบไหนครับ?"
                            }
                        ],
                        type: "box"
                    },
                    direction: "ltr",
                    footer: {
                        type: "box",
                        layout: "vertical",
                        contents: [
                            {
                                action: {
                                    label: "ดูแผนทั้งหมด",
                                    type: "uri",
                                    uri: "https://liff.line.me/1653975470-4Webv3MY"
                                },
                                type: "button",
                                color: "#C25738",
                                height: "sm",
                                margin: "xs",
                                style: "primary"
                            },
                            {
                                margin: "xs",
                                color: "#C25738",
                                height: "sm",
                                style: "primary",
                                action: {
                                    data: "text",
                                    label: "ดูแผนวันนี้",
                                    type: "postback",
                                    text: "ดูแผนวันนี้"
                                },
                                type: "button"
                            }
                        ]
                    }
                }
            }
        ]
    })

    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}

function replyPlanPerDay(reply_token, msg) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {EUEqmnC5MpIHn7O3gS9uJ2AJBVt7JCotZj/+t2hOOlBTt7b/+4nPAg/9BFeRawRghXeIeqZe5EMVIexmmEh5c80nwP+BMli10YB6vNFLl38OHFljNNNy1jS9Ft52GmAIUro72i8ebhHfzD9mN9CX1QdB04t89/1O/w1cDnyilFU=}'
    }

    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [
            {
                type: 'text',
                text: "Flex msg Perday"
            },
        ]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}

function replyPlanAll(reply_token, msg) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {EUEqmnC5MpIHn7O3gS9uJ2AJBVt7JCotZj/+t2hOOlBTt7b/+4nPAg/9BFeRawRghXeIeqZe5EMVIexmmEh5c80nwP+BMli10YB6vNFLl38OHFljNNNy1jS9Ft52GmAIUro72i8ebhHfzD9mN9CX1QdB04t89/1O/w1cDnyilFU=}'
    }

    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [
            {
                type: 'text',
                text: "lineliff here"
            },
        ]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}

function replyBill(reply_token, msg) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {EUEqmnC5MpIHn7O3gS9uJ2AJBVt7JCotZj/+t2hOOlBTt7b/+4nPAg/9BFeRawRghXeIeqZe5EMVIexmmEh5c80nwP+BMli10YB6vNFLl38OHFljNNNy1jS9Ft52GmAIUro72i8ebhHfzD9mN9CX1QdB04t89/1O/w1cDnyilFU=}'
    }

    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [
            {
                type: "text",
                text: "จะทำอะไรดีครับ?",
                quickReply: {
                    items: [
                        {
                            type: "action",
                            action: {
                                type: "message",
                                label: "สร้างบิล",
                                text: "สร้างบิล"
                            }
                        },
                        {
                            type: "action",
                            action: {
                                type: "message",
                                label: "ดูบิล",
                                text: "ดูบิล"
                            }
                        }
                    ]
                }
            }
        ]
    })

    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}

function replyCreateBill(reply_token, msg) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {EUEqmnC5MpIHn7O3gS9uJ2AJBVt7JCotZj/+t2hOOlBTt7b/+4nPAg/9BFeRawRghXeIeqZe5EMVIexmmEh5c80nwP+BMli10YB6vNFLl38OHFljNNNy1jS9Ft52GmAIUro72i8ebhHfzD9mN9CX1QdB04t89/1O/w1cDnyilFU=}'
    }

    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [
            {
                type: "text",
                text: "อยากให้ผมสอนอะไรครับ ?",
                quickReply: {
                    items: [
                        {
                            type: "action",
                            action: {
                                type: "message",
                                label: "สร้างบิล",
                                text: "สร้างบิล"
                            }
                        },
                        {
                            type: "action",
                            action: {
                                type: "message",
                                label: "ดูบิล",
                                text: "ดูบิล"
                            }
                        }
                    ]
                }
            }
        ]
    })

    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}

function replySeeBill(reply_token, msg) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {EUEqmnC5MpIHn7O3gS9uJ2AJBVt7JCotZj/+t2hOOlBTt7b/+4nPAg/9BFeRawRghXeIeqZe5EMVIexmmEh5c80nwP+BMli10YB6vNFLl38OHFljNNNy1jS9Ft52GmAIUro72i8ebhHfzD9mN9CX1QdB04t89/1O/w1cDnyilFU=}'
    }

    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [
            {
                type: "text",
                text: "อยากให้ผมสอนอะไรครับ ?",
                quickReply: {
                    items: [
                        {
                            action: {
                                type: "message",
                                label: "สร้างบิล",
                                text: "สร้างบิล"
                            }
                        },
                        {
                            action: {
                                type: "message",
                                label: "ดูบิล",
                                text: "ดูบิล"
                            }
                        }
                    ]
                }
            }
        ]
    })

    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}

function replyWeather(reply_token, msg) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {EUEqmnC5MpIHn7O3gS9uJ2AJBVt7JCotZj/+t2hOOlBTt7b/+4nPAg/9BFeRawRghXeIeqZe5EMVIexmmEh5c80nwP+BMli10YB6vNFLl38OHFljNNNy1jS9Ft52GmAIUro72i8ebhHfzD9mN9CX1QdB04t89/1O/w1cDnyilFU=}'
    }

    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [
            {
                type: "text",
                text: " อยากรู้สภาพอากาศที่ไหนครับ?",
                quickReply: {
                    items: [
                        {
                            type: "action",
                            action: {
                                type: "location",
                                label: "Location"
                            }
                        }
                    ]
                }
            }
        ]
    })

    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}

function replyWeatherMaps(reply_token, msg) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImIwYmYzY2E2YzFiZTI3ZjZkOGY5NDFhNjgyMmY2MjE4ZWViMDIzMzYyNDE1NDA3Nzk1NzIxNGYwYTkxNjJiNzljYjZjZTc1MGM4MzEwNGRmIn0.eyJhdWQiOiIyIiwianRpIjoiYjBiZjNjYTZjMWJlMjdmNmQ4Zjk0MWE2ODIyZjYyMThlZWIwMjMzNjI0MTU0MDc3OTU3MjE0ZjBhOTE2MmI3OWNiNmNlNzUwYzgzMTA0ZGYiLCJpYXQiOjE2MDA1MzE1NTEsIm5iZiI6MTYwMDUzMTU1MSwiZXhwIjoxNjMyMDY3NTUxLCJzdWIiOiI5NzkiLCJzY29wZXMiOltdfQ.FMch8VXWx957OH1FjR28JKaHcfxsHV4fSL5Scc_hflnRClf95iND0YaqbxNkiUX7f0TuhxzIMl0GFbrvQ6NKXOvYSj4dfU8jJMuDDG3QZTkLgExXDvQtsH2Ui5ZpAhHgPtkK7lPV1fGsQG_d5Ad9GjOD_oxgZygm6_iSM2ERh76kd2YywxFuN3_pBrBmLOm7kNFYatm_Ntg0Xir7NnnKVsE_S2RYYqsIoM5ZRjrWKK4A0Erk6WiXtXeD0fAFuv-Ope8cG_4Bh3VBgvhbFW3jNZ1OniutHYcba2Bv_P_WoL-xrRzxxvMSIKNXLfneoLNW5HPo0DNV273ZemPgbC6x3LdeFOCxtjy1YA-DZ2tTuQycm32CrD3GJXxQAaYC9TjthkCLXrcu40S6D2jQWOt-brkwhUuY2vNEdVx0YZDZXZ34TWLXYLVoJs-lSMI_NMtMdhhxo29gXr07YJFB7E8NvN2HSVA_Y4lCsz8KIP7ZNhK8QeuR3raxuFPxBM-3e0a-sEiQs3c5NvzEZhLrVD-ldxkCD5t6PdtgUOgaWk9tUfltrZ0sQsga6RFx0sj-R7TvwPHA8oOjarVIc-e-2vixGxipSmXccZ47-SxfAXUn91XfhZwg3zs4UyrVEjy1n62lFLGfmzMSOL05w9fLdJd7cMOs14d67ldnWvXQGV-aQL4'
    }
    exports.LineBotPush = functions.https.onRequest((req, res) => {
        events.location
        return request({
            method: `GET`,
            uri: `https://data.tmd.go.th/nwpapi/v1/forecast/location/daily/at`,
            json: true
        }).then((response) => {
            const message = `City: ${response.name}\nWeather: ${response.weather[0].description}\nTemperature: ${response.main.temp}`;
            return push(res, message);
        }).catch((error) => {
            return res.status(500).send(error);
        });
    });


    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [
            {
                weather_forecast: {
                    locations: [
                        {
                            location: {
                                lat: 13.0068,
                                lon: 100.0829
                            },
                            forecasts: [
                                {
                                    time: "2017-08-17T00:00:00+07:00",
                                    data: {
                                        rh: 88.54,
                                        tc_max: 28.56
                                    }
                                },
                                {
                                    time: "2017-08-18T00:00:00+07:00",
                                    data: {
                                        rh: 87.44,
                                        tc_max: 27.21
                                    }
                                }
                            ]
                        }
                    ]
                }
            }
        ]
    })

    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}

function replyContact(reply_token, msg) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {EUEqmnC5MpIHn7O3gS9uJ2AJBVt7JCotZj/+t2hOOlBTt7b/+4nPAg/9BFeRawRghXeIeqZe5EMVIexmmEh5c80nwP+BMli10YB6vNFLl38OHFljNNNy1jS9Ft52GmAIUro72i8ebhHfzD9mN9CX1QdB04t89/1O/w1cDnyilFU=}'
    }

    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [
            {
                type: "template",
                altText: "This is a buttons template",
                template: {
                    type: "buttons",
                    thumbnailImageUrl: "https://1.bp.blogspot.com/-U90M8DyKu7Q/W9EtONMCf6I/AAAAAAAAW_4/7L_jB_Rg9oweu2HKhULNdu9WNefw9zf9wCLcBGAs/s1600/sao-full.jpg",
                    imageAspectRatio: "rectangle",
                    imageSize: "cover",
                    imageBackgroundColor: "#FFFFFF",
                    title: "ติดต่อเจ้าหน้าที่",
                    defaultAction: {
                        type: "uri",
                        label: "contact",
                        uri: "https://www.google.com"
                    },
                    actions: [
                        {
                            type: "text",
                            label: "อีเมลล์",
                            text: "mrjourney.6012@gmail.com"
                        },
                        {
                            type: "postback",
                            label: "เพิ่มลงรถเข็น",
                            data: "action=add&itemid=123"
                        },
                        {
                            type: "uri",
                            label: "อ่านรายละเอียด",
                            uri: "https://www.google.com"
                        }
                    ]
                }

            }
        ]
    })

    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}

function replyRecommend(reply_token, msg) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {EUEqmnC5MpIHn7O3gS9uJ2AJBVt7JCotZj/+t2hOOlBTt7b/+4nPAg/9BFeRawRghXeIeqZe5EMVIexmmEh5c80nwP+BMli10YB6vNFLl38OHFljNNNy1jS9Ft52GmAIUro72i8ebhHfzD9mN9CX1QdB04t89/1O/w1cDnyilFU=}'
    }

    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [
            {
                type: "text",
                text: " แนะนำอะไรดี?",
                quickReply: {
                    items: [
                        {
                            type: "action",
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/test-storage-rom.appspot.com/o/1601125619647eat.png?alt=media&token=61ebdb96-4649-406f-b7e1-e39e8730d909",
                            action: {
                                type: "message",
                                label: "ที่กิน",
                                text: "ที่กิน"
                            }
                        },
                        {
                            type: "action",
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/test-storage-rom.appspot.com/o/1601125559896place.png?alt=media&token=e2d872e8-6b87-443c-a88d-7bd8bf796009",
                            action: {
                                type: "message",
                                label: "ที่เที่ยว",
                                text: "ที่เที่ยว"
                            }
                        },
                        {
                            type: "action",
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/test-storage-rom.appspot.com/o/1601125494822sleep.png?alt=media&token=a33b0a23-a1bf-4768-b39e-2f13f0841cac",
                            action: {
                                type: "message",
                                label: "ที่พัก",
                                text: "ที่พัก"
                            }
                        }
                    ]
                }
            }
        ]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}

function replyRecommendEat(reply_token, msg) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {EUEqmnC5MpIHn7O3gS9uJ2AJBVt7JCotZj/+t2hOOlBTt7b/+4nPAg/9BFeRawRghXeIeqZe5EMVIexmmEh5c80nwP+BMli10YB6vNFLl38OHFljNNNy1jS9Ft52GmAIUro72i8ebhHfzD9mN9CX1QdB04t89/1O/w1cDnyilFU=}'
    }

    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [
            {
                type: "carousel",
                contents: [
                    {
                        type: "bubble",
                        direction: "ltr",
                        hero: {
                            type: "image",
                            url: "https://food.mthai.com/app/uploads/2013/07/10.jpg",
                            size: "full",
                            aspectRatio: "16:9",
                            aspectMode: "cover"
                        },
                        body: {
                            type: "box",
                            layout: "vertical",
                            spacing: "sm",
                            contents: [
                                {
                                    type: "text",
                                    text: "สร้างแผนการท่องเที่ยว",
                                    weight: "bold",
                                    size: "lg",
                                    align: "center",
                                    wrap: true,
                                    contents: []
                                }
                            ]
                        },
                        footer: {
                            type: "box",
                            layout: "vertical",
                            spacing: "sm",
                            contents: [
                                {
                                    type: "button",
                                    action: {
                                        type: "message",
                                        label: "#สร้างทริป",
                                        text: "#สร้างทริป"
                                    },
                                    color: "#F37945",
                                    style: "primary"
                                }
                            ]
                        }
                    },
                    {
                        type: "bubble",
                        direction: "ltr",
                        hero: {
                            type: "image",
                            url: "https://food.mthai.com/app/uploads/2013/07/10.jpg",
                            size: "full",
                            aspectRatio: "16:9",
                            aspectMode: "cover"
                        },
                        body: {
                            type: "box",
                            layout: "vertical",
                            spacing: "sm",
                            contents: [
                                {
                                    type: "text",
                                    text: "วิธีการใช้งาน",
                                    weight: "bold",
                                    size: "lg",
                                    align: "center",
                                    wrap: true,
                                    contents: []
                                }
                            ]
                        },
                        footer: {
                            type: "box",
                            layout: "vertical",
                            spacing: "sm",
                            contents: [
                                {
                                    type: "button",
                                    action: {
                                        type: "message",
                                        label: "#วิธีการใช้",
                                        text: "#วิธีการใช้"
                                    },
                                    color: "#F37945",
                                    style: "primary"
                                }
                            ]
                        }
                    },
                    {
                        type: "bubble",
                        direction: "ltr",
                        hero: {
                            type: "image",
                            url: "https://food.mthai.com/app/uploads/2013/07/10.jpg",
                            size: "full",
                            aspectRatio: "16:9",
                            aspectMode: "cover"
                        },
                        body: {
                            type: "box",
                            layout: "vertical",
                            spacing: "sm",
                            contents: [
                                {
                                    type: "text",
                                    text: "ดูแผนการท่องเที่ยว",
                                    weight: "bold",
                                    size: "lg",
                                    align: "center",
                                    wrap: true,
                                    contents: []
                                }
                            ]
                        },
                        footer: {
                            type: "box",
                            layout: "vertical",
                            spacing: "sm",
                            contents: [
                                {
                                    type: "button",
                                    action: {
                                        type: "message",
                                        label: "#ดูทริป",
                                        text: "#ดูทริป"
                                    },
                                    color: "#F37945",
                                    style: "primary"
                                }
                            ]
                        }
                    },
                    {
                        type: "bubble",
                        direction: "ltr",
                        hero: {
                            type: "image",
                            url: "https://food.mthai.com/app/uploads/2013/07/10.jpg",
                            size: "full",
                            aspectRatio: "16:9",
                            aspectMode: "cover"
                        },
                        body: {
                            type: "box",
                            layout: "vertical",
                            spacing: "sm",
                            contents: [
                                {
                                    type: "text",
                                    text: "แนะนำสถานที่",
                                    weight: "bold",
                                    size: "lg",
                                    align: "center",
                                    wrap: true,
                                    contents: []
                                }
                            ]
                        },
                        footer: {
                            type: "box",
                            layout: "vertical",
                            spacing: "sm",
                            contents: [
                                {
                                    type: "button",
                                    action: {
                                        type: "message",
                                        label: "#แนะนำ",
                                        text: "#แนะนำ"
                                    },
                                    color: "#F37945",
                                    style: "primary"
                                }
                            ]
                        }
                    }
                ]
            }
        ]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}

function replyHelp(reply_token, msg) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {EUEqmnC5MpIHn7O3gS9uJ2AJBVt7JCotZj/+t2hOOlBTt7b/+4nPAg/9BFeRawRghXeIeqZe5EMVIexmmEh5c80nwP+BMli10YB6vNFLl38OHFljNNNy1jS9Ft52GmAIUro72i8ebhHfzD9mN9CX1QdB04t89/1O/w1cDnyilFU=}'
    }

    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [
            {
                type: "text",
                text: " อยากให้ช่วยเรื่องอะไรดีครับ?",
                quickReply: {
                    items: [
                        {
                            type: "action",
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/test-storage-rom.appspot.com/o/1601199781153Create.png?alt=media&token=388d4d44-fae8-497a-bf61-fc77c2ce46b3",
                            action: {
                                type: "message",
                                label: "สร้างทริป",
                                text: "วิธีการสร้างทริป"
                            }
                        },
                        {
                            type: "action",
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/test-storage-rom.appspot.com/o/1601199871983Check.png?alt=media&token=3f98d61f-eb10-4e7e-b88f-622e6e6768e0",
                            action: {
                                type: "message",
                                label: "ดูแผน",
                                text: "วิธีการดูแผน"
                            }
                        },
                        {
                            type: "action",
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/test-storage-rom.appspot.com/o/1601199904275Bill.png?alt=media&token=f9ef39dc-8344-4614-bcf4-6edf82926598",
                            action: {
                                type: "message",
                                label: "บิลเก็บเงิน",
                                text: "วิธีการจัดการบิล"
                            }
                        }
                    ]
                }
            }
        ]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}

function replyHelpCreateTrip(reply_token, msg) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {EUEqmnC5MpIHn7O3gS9uJ2AJBVt7JCotZj/+t2hOOlBTt7b/+4nPAg/9BFeRawRghXeIeqZe5EMVIexmmEh5c80nwP+BMli10YB6vNFLl38OHFljNNNy1jS9Ft52GmAIUro72i8ebhHfzD9mN9CX1QdB04t89/1O/w1cDnyilFU=}'
    }

    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [
            {
                type: "image",
                originalContentUrl: "https://firebasestorage.googleapis.com/v0/b/test-storage-rom.appspot.com/o/1601135456471menu-09.png?alt=media&token=8b978458-96c8-432c-a734-5e378bc5dc31",
                previewImageUrl: "https://firebasestorage.googleapis.com/v0/b/test-storage-rom.appspot.com/o/1601135456471menu-09.png?alt=media&token=8b978458-96c8-432c-a734-5e378bc5dc31"
            }
        ]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}

function replyHelpPlan(reply_token, msg) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {EUEqmnC5MpIHn7O3gS9uJ2AJBVt7JCotZj/+t2hOOlBTt7b/+4nPAg/9BFeRawRghXeIeqZe5EMVIexmmEh5c80nwP+BMli10YB6vNFLl38OHFljNNNy1jS9Ft52GmAIUro72i8ebhHfzD9mN9CX1QdB04t89/1O/w1cDnyilFU=}'
    }

    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [
            {
                type: "image",
                originalContentUrl: "https://firebasestorage.googleapis.com/v0/b/test-storage-rom.appspot.com/o/1601135531375menu-10.png?alt=media&token=a57f9a3a-402d-4b89-bd9c-b068b17eb1c6",
                previewImageUrl: "https://firebasestorage.googleapis.com/v0/b/test-storage-rom.appspot.com/o/1601135531375menu-10.png?alt=media&token=a57f9a3a-402d-4b89-bd9c-b068b17eb1c6"
            }
        ]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}

function replyHelpBill(reply_token, msg) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {EUEqmnC5MpIHn7O3gS9uJ2AJBVt7JCotZj/+t2hOOlBTt7b/+4nPAg/9BFeRawRghXeIeqZe5EMVIexmmEh5c80nwP+BMli10YB6vNFLl38OHFljNNNy1jS9Ft52GmAIUro72i8ebhHfzD9mN9CX1QdB04t89/1O/w1cDnyilFU=}'
    }

    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [
            {
                type: "image",
                originalContentUrl: "https://firebasestorage.googleapis.com/v0/b/test-storage-rom.appspot.com/o/1601135590386menu-11.png?alt=media&token=cb138a53-2c36-4aae-a2a4-d054d4d67e21",
                previewImageUrl: "https://firebasestorage.googleapis.com/v0/b/test-storage-rom.appspot.com/o/1601135590386menu-11.png?alt=media&token=cb138a53-2c36-4aae-a2a4-d054d4d67e21"
            }
        ]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}

module.exports = router;
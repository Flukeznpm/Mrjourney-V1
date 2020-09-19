var express = require('express');
var router = express.Router();
const request = require('request');
// const app = express();

router.post('/webhook', (req, res) => {
    let reply_token = req.body.events[0].replyToken
    let msg = req.body.events[0].message.text
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
        replyPlanPerDay(reply_token, msg)
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
    else {
        reply(reply_token, msg)
    }
    res.sendStatus(200)
})


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


//each function

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
                text: "Line Liff here"
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
                                    uri: "https://linecorp.com"
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
                            imageUrl: "https://example.com/sushi.png",
                            action: {
                                type: "message",
                                label: "สร้างบิล",
                                text: "สร้างบิล"
                            }
                        },
                        {
                            type: "action",
                            imageUrl: "https://example.com/tempura.png",
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
                            imageUrl: "https://example.com/sushi.png",
                            action: {
                                type: "message",
                                label: "สร้างบิล",
                                text: "สร้างบิล"
                            }
                        },
                        {
                            type: "action",
                            imageUrl: "https://example.com/tempura.png",
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

// function replyHelp(reply_token, msg) {
//     let headers = {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer {EUEqmnC5MpIHn7O3gS9uJ2AJBVt7JCotZj/+t2hOOlBTt7b/+4nPAg/9BFeRawRghXeIeqZe5EMVIexmmEh5c80nwP+BMli10YB6vNFLl38OHFljNNNy1jS9Ft52GmAIUro72i8ebhHfzD9mN9CX1QdB04t89/1O/w1cDnyilFU=}'
//     }

//     let body = JSON.stringify({
//         replyToken: reply_token,
//         messages: [
//             {
//                 type: "text",
//                 text: "อยากให้ผมสอนอะไรครับ ?",
//                 quickReply: {
//                   items: [
//                     {
//                       type: "action",
//                       imageUrl: "https://example.com/sushi.png",
//                       action: {
//                         type: "message",
//                         label: "สร้างทริป",
//                         text: "สร้างทริป"
//                       }
//                     },
//                     {
//                       type: "action",
//                       imageUrl: "https://example.com/tempura.png",
//                       action: {
//                         type: "message",
//                         label: "ดูแผน",
//                         text: "ดูแผน"
//                       }
//                     },
//                     {
//                       type: "action",
//                       action: {
//                         type: "บิลเก็บเงิน",
//                         label: "บิลเก็บเงิน"
//                       }
//                     }
//                   ]
//                 }
//               }
//         ]
//     })

//     request.post({
//         url: 'https://api.line.me/v2/bot/message/reply',
//         headers: headers,
//         body: body
//     }, (err, res, body) => {
//         console.log('status = ' + res.statusCode);
//     });
// }

// function replyRecommend(reply_token, msg) {
//     let headers = {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer {EUEqmnC5MpIHn7O3gS9uJ2AJBVt7JCotZj/+t2hOOlBTt7b/+4nPAg/9BFeRawRghXeIeqZe5EMVIexmmEh5c80nwP+BMli10YB6vNFLl38OHFljNNNy1jS9Ft52GmAIUro72i8ebhHfzD9mN9CX1QdB04t89/1O/w1cDnyilFU=}'
//     }

//     let body = JSON.stringify({
//         replyToken: reply_token,
//         messages: [
//             {
//                 type: "text",
//                 text: "อยากให้ผมแนะนำอะไรดีค้าบ?",
//                 quickReply: {
//                   items: [
//                     {
//                       type: "action",
//                       imageUrl: "https://example.com/sushi.png",
//                       action: {
//                         type: "message",
//                         label: "ที่กิน",
//                         text: "ที่กิน"
//                       }
//                     },
//                     {
//                       type: "action",
//                       imageUrl: "https://example.com/tempura.png",
//                       action: {
//                         type: "message",
//                         label: "ที่เที่ยว",
//                         text: "ที่เที่ยว"
//                       }
//                     },
//                     {
//                         type: "action",
//                         imageUrl: "https://example.com/tempura.png",
//                         action: {
//                           type: "message",
//                           label: "ที่พัก",
//                           text: "ที่พัก"
//                         }
//                     }
//                   ]
//                 }
//               }
//         ]
//     })

//     request.post({
//         url: 'https://api.line.me/v2/bot/message/reply',
//         headers: headers,
//         body: body
//     }, (err, res, body) => {
//         console.log('status = ' + res.statusCode);
//     });
// }

// function replyWeather(reply_token, msg) {
//     let headers = {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer {EUEqmnC5MpIHn7O3gS9uJ2AJBVt7JCotZj/+t2hOOlBTt7b/+4nPAg/9BFeRawRghXeIeqZe5EMVIexmmEh5c80nwP+BMli10YB6vNFLl38OHFljNNNy1jS9Ft52GmAIUro72i8ebhHfzD9mN9CX1QdB04t89/1O/w1cDnyilFU=}'
//     }

//     let body = JSON.stringify({
//         replyToken: reply_token,
//         messages: [
//             {
//                 type: "text",
//                 text: " อยากรู้สภาพอากาศที่ไหนครับ?",
//                 quickReply: {
//                     items: [
//                         {
//                             type: "action",
//                             action: {
//                                 type: "location",
//                                 label: "Location"
//                             }
//                         }
//                     ]
//                 }
//             }
//         ]
//     })

//     request.post({
//         url: 'https://api.line.me/v2/bot/message/reply',
//         headers: headers,
//         body: body
//     }, (err, res, body) => {
//         console.log('status = ' + res.statusCode);
//     });
// }

function replyWeather(reply_token, msg) {
const functions = require('firebase-functions');
const request = require('request-promise');

const LINE_MESSAGING_API = 'https://api.line.me/v2/bot/message';
const LINE_HEADER = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {EUEqmnC5MpIHn7O3gS9uJ2AJBVt7JCotZj/+t2hOOlBTt7b/+4nPAg/9BFeRawRghXeIeqZe5EMVIexmmEh5c80nwP+BMli10YB6vNFLl38OHFljNNNy1jS9Ft52GmAIUro72i8ebhHfzD9mN9CX1QdB04t89/1O/w1cDnyilFU=}'
};

exports.LineBotPush = functions.https.onRequest((req, res) => {
  return request({
    method: `GET`,
    uri: `https://api.openweathermap.org/data/2.5/weather?units=metric&type=accurate&zip=10330,th&appid=f356a3b088a90918fa91d1ace7506841`,
    json: true
  }).then((response) => {
    const message = `City: ${response.name}\nWeather: ${response.weather[0].description}\nTemperature: ${response.main.temp}`;
    return push(res, message);
  }).catch((error) => {
    return res.status(500).send(error);
  });
});

const push = (res, msg) => {
  return request({
    method: `POST`,
    uri: `${LINE_MESSAGING_API}/push`,
    headers: LINE_HEADER,
    body: JSON.stringify({
      messages: [
        {
          type: `text`,
          text: msg
        }
      ]
    })
  }).then(() => {
    return res.status(200).send(`Done`);
  }).catch((error) => {
    return Promise.reject(error);
  });
}
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
                            text: "mrjourney@"
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
                            imageUrl: "https://example.com/sushi.png",
                            action: {
                                type: "message",
                                label: "ที่กิน",
                                text: "ที่กิน"
                            }
                        },
                        {
                            type: "action",
                            imageUrl: "https://example.com/tempura.png",
                            action: {
                                type: "message",
                                label: "ที่เที่ยว",
                                text: "ที่เที่ยว"
                            }
                        },
                        {
                            type: "action",
                            imageUrl: "https://example.com/tempura.png",
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
                            imageUrl: "https://example.com/sushi.png",
                            action: {
                                type: "message",
                                label: "สร้างทริป",
                                text: "วิธีการสร้างทริป"
                            }
                        },
                        {
                            type: "action",
                            imageUrl: "https://example.com/tempura.png",
                            action: {
                                type: "message",
                                label: "ดูแผน",
                                text: "วิธีการดูแผน"
                            }
                        },
                        {
                            type: "action",
                            imageUrl: "https://example.com/tempura.png",
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
                "type": "bubble",
                "body": {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                        {
                            "type": "image",
                            "url": "https://www.linefriends.com/content/banner/201804/3b5364c97c2d4a26988f85acdc78514e.jpg",
                        }
                    ]
                }
            }
        ]
    })
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
                "type": "bubble",
                "body": {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                        {
                            "type": "image",
                            "url": "https://www.linefriends.com/content/banner/201804/3b5364c97c2d4a26988f85acdc78514e.jpg",
                            "size": "full",
                            "aspectRatio": "16:9",
                            "aspectMode": "cover"
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

function replyHelpBill(reply_token, msg) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {EUEqmnC5MpIHn7O3gS9uJ2AJBVt7JCotZj/+t2hOOlBTt7b/+4nPAg/9BFeRawRghXeIeqZe5EMVIexmmEh5c80nwP+BMli10YB6vNFLl38OHFljNNNy1jS9Ft52GmAIUro72i8ebhHfzD9mN9CX1QdB04t89/1O/w1cDnyilFU=}'
    }

    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [
            {
                type: "bubble",
                body: {
                    type: "box",
                    layout: "horizontal",
                    contents: [
                        {
                            type: "image",
                            url: "https://www.linefriends.com/content/banner/201804/3b5364c97c2d4a26988f85acdc78514e.jpg",
                            size: "full",
                            aspectRatio: "16:9",
                            aspectMode: "cover"
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


module.exports = router;
var express = require('express');
var router = express.Router();
const request = require('request');
// const app = express();

router.post('/webhook', (req, res) => {
    let reply_token = req.body.events[0].replyToken
    let msg = req.body.events[0].message.text
    if (msg === "อาจารย์โอ๋") {
        replyRom(reply_token, msg)
       
    }
    else if(msg === "#สร้างทริป"){
        replyCreate(reply_token, msg)
    }
    else if(msg === "#ดูแผน"){
        replyPlan(reply_token, msg)
    }
    // else if(msg === "#สร้างบิล"){
    //     replyCreateBill(reply_token, msg)
    // }
    // else if(msg === "#ดูบิล"){
    //     replyCreate(reply_token, msg)
    // }
    else if(msg === "#ช่วย"){
        replyHelp(reply_token, msg)
    }
    else if(msg === "#แนะนำ"){
        replyRecommend(reply_token, msg)
    }
    else if(msg === "#อากาศ"){
        replyWeather(reply_token, msg)
    }
    else if(msg === "#ติดต่อ"){
        replyContact(reply_token, msg)
    }
    else if(msg === "#บิล"){
        replyBill(reply_token, msg)
    }
    else if(msg === "#สร้างบิล"){
        replyCreateBill(reply_token, msg)
    }
    else if(msg === "#ดูบิล"){
        replySeeBill(reply_token, msg)
    }
    else {
        reply(reply_token, msg)
    }
    res.sendStatus(200)
})


function replyRom(reply_token, msg) {
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
function replyGun(reply_token, msg) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {EUEqmnC5MpIHn7O3gS9uJ2AJBVt7JCotZj/+t2hOOlBTt7b/+4nPAg/9BFeRawRghXeIeqZe5EMVIexmmEh5c80nwP+BMli10YB6vNFLl38OHFljNNNy1jS9Ft52GmAIUro72i8ebhHfzD9mN9CX1QdB04t89/1O/w1cDnyilFU=}'
    }

    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [
            {
                type: 'text',
                text: 'สวัสดีจ้า'
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
                type: "text",
                text: "สร้างทริป"
            },
            {
                 type: "uri",
                 uri: "https://linecorp.com"
                        
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
                text: "อยากให้ผมสอนอะไรครับ ?",
                quickReply: {
                  items: [
                    {
                      type: "action",
                      imageUrl: "https://example.com/sushi.png",
                      action: {
                        type: "message",
                        label: "สร้างทริป",
                        text: "สร้างทริป"
                      }
                    },
                    {
                      type: "action",
                      imageUrl: "https://example.com/tempura.png",
                      action: {
                        type: "message",
                        label: "ดูแผน",
                        text: "ดูแผน"
                      }
                    },
                    {
                      type: "action",
                      action: {
                        type: "บิลเก็บเงิน",
                        label: "บิลเก็บเงิน"
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
                text: "อยากให้ผมแนะนำอะไรดีค้าบ?",
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
                text: "อยากรู้สภาพอากาศแถวไหนครับ ?",
                quickReply: {
                  items: [
                    {
                      type: "action",
                      action: {
                        type: "Location",
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

function replyContact(reply_token, msg) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {EUEqmnC5MpIHn7O3gS9uJ2AJBVt7JCotZj/+t2hOOlBTt7b/+4nPAg/9BFeRawRghXeIeqZe5EMVIexmmEh5c80nwP+BMli10YB6vNFLl38OHFljNNNy1jS9Ft52GmAIUro72i8ebhHfzD9mN9CX1QdB04t89/1O/w1cDnyilFU=}'
    }

    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [
            {
                type: "text",
                text: "ติดต่อเจ้าหน้าที่",
                quickReply: {
                  items: [
                    {
                      type: "action",
                      action: {
                        type: "Location",
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


module.exports = router;
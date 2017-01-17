var https = require('https');

exports.handler = function(event, context) {
    console.log(event);
    var data = event.events[0];
    var replyToken = data.replyToken;
    var message = data.message;
    var text = message.text;

    var request_body = JSON.stringify({
      replyToken: replyToken,
      messages:[
                {
                    "type":"text",
                    "text": text
                }
            ]
    });

    var opts = {
        hostname: 'api.line.me',
        path: '/v2/bot/message/reply',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": "Bearer " + process.env.CHANNEL_ACCESS_TOKEN,
            "Content-Length": Buffer.byteLength(request_body)
        },
        method: 'POST',
    };

    var req = https.request(opts, function(res) {
        res.on('request_body', function(res) {
            console.log(res.toString());
        }).on('error', function(e) {
            console.log('ERROR: ' + e.stack);
        });
    });
    req.write(request_body);
    req.end();
};

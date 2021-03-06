// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:
//
var crypto = require('crypto');
var moment = require('moment');
var Buffer = require('buffer').Buffer;



function md5 (text) {

    return crypto.createHash('md5').update(text).digest('hex');
};

function base64 (text){
    return new Buffer("text").toString('base64');
}

AV.Cloud.define('testCloopen', function(request, response)
{
    var timeStr = moment().format('YYYMMDDHHmmss');

    var authorizationStr = 'aaf98f894032b237014047963bb9009d'+':'+timeStr;

    var authorization64 = base64(authorizationStr);
    
    var sigstr = 'aaf98f894032b237014047963bb9009d'+'bbc381b9a024443da462307cec93ce0b'+timeStr;

    var sig = md5(sigstr);
    
    var bodyxml ='<SubAccount><appId>aaf98f894032b2370140479684b0009f</appId><friendlyName>1234556@qq.com</friendlyName><accountSid>aaf98f894032b237014047963bb9009d</accountSid></SubAccount>';

    // response.success(sig.toUpperCase());

    AV.Cloud.httpRequest({
        method: 'POST',
        url: 'https://app.cloopen.com:8883/2013-03-22/Accounts/aaf98f894032b237014047963bb9009d/SubAccounts?sig='+sig.toUpperCase(),
        headers: {
            'Content-Type': 'application/xml',
            'Accept': 'application/xml',
            'charset': 'utf-8',
            'Authorization': authorization64
        },
        body: bodyxml,
        success:function(httpResponse) {
            response.success(httpResponse.text);
        },
        error:function(httpResponse) {
            respose.error('Request failed with response code ' + httpResponse.status);
        }
    });
    
});


var express = require("express");
var app = express(); //minimalistic web framework for node.js (similiar to flask ;) )
var bodyParser = require("body-parser");//helps me parse the body
var uuidV4 = require('uuid/v4');//generate the tokens
var luhn = require("luhn"); //validate cc format
var redis = require('redis');


var client = redis.createClient();



client.on('connect', function() {
    console.log('connected to redis');
});


var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post('/creditcard',urlencodedParser, function (req,res){//store a new cc and get token
	var cc = req.body['credit-card'].replace(/\D/g,''); //remove all non numeric chars
	if (luhn.validate(cc)){
		var key = uuidV4();
		client.set(key,cc); //save the cc under the uuid key to redis
		res.end(JSON.stringify({'token':key}));
	} else {
		res.end("invalid input")
	}
})

app.get('/creditcard/:token',function(req,res){ //get cc based on existing token.
	return client.get(req.params.token, function(err,reply) {
		var cc = reply;
		console.log(typeof cc);
		res.end(JSON.stringify({'credit-card':cc}));
	});

})

var server = app.listen(8081,function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log("running on: http://%s:%s" , host,port );
})
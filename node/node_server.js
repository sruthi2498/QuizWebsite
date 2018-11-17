var fs = require('fs');
var http=require("http");
var path = require('path');
var express=require("express");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); 
var vk=require("./valid_key");


app.use('/js',express.static("js"));
app.use('/css',express.static("css"));

app.get('/home', function(req, res){
   res.sendFile('home.html', { root: path.join(__dirname, '../') });
});

app.post('/joinquizkey', function(req, res) {
	if(req.body==null)console.log("req.body is null");
	console.log("joinquizkey : ",req.body.key);
	if(vk.checkValidKey(req.body.key)) res.send("Valid");
	else res.send("Invaid");

});

console.log("server running at localhost:3000");
app.listen(3000);
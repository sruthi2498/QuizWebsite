var express = require('express');
var app = express();
var router = express.Router();

var things = require('./test_node_express2.js');

//both index.js and things.js should be in same directory
app.use('/test_node_express2', things);

console.log("listening at 3000");
app.listen(3000);



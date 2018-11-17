var express = require('express');
var app = express();
var router = express.Router();

router.get('/', function(req, res){
   res.send('GET route on test2.');
});
router.post('/', function(req, res){
   res.send('POST route on test2.');
});

//export this router to use in our index.js
module.exports = router;
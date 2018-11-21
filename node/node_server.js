var fs = require('fs');
var http=require("http");
var path = require('path');
var express=require("express");
var app = express();
var bodyParser = require('body-parser');
var vk=require("./valid_key");
var qh=require("./quiz_handler");
var db=require("./db/node_db_main");
var io = require('socket.io');

app.use(bodyParser.urlencoded({ extended: true })); 



app.use('/js',express.static("js"));
app.use('/css',express.static("css"));

app.get('/home', function(req, res){
   res.sendFile('home.html', { root: path.join(__dirname, '../') });
});

app.post('/joinquizkey', function(req, res) {
	if(req.body==null)console.log("req.body is null");
	console.log("joinquizkey : ",req.body.key);
	if(vk.checkValidKey(req.body.key))res.send("Valid");
	else res.send("Invalid");

});

app.post('/joinquiz', function(req, res){
   res.sendFile('sink.html', { root: path.join(__dirname, '../') });
});
app.get('/quizpage', function(req, res){
   res.sendFile('quizpage2.html', { root: path.join(__dirname, '../') });
});


app.get('/getQuizLength', function(req, res) {
	if(req.body==null){
		console.log("req.body is null");
		res.send("Error req.body is null");
	}
	console.log("quizname : ",req.query.quiz_name);
	quiz_name=req.query.quiz_name;
	qh.getAllQuestionsForQuiz(quiz_name,function(err, results){
	    if(err) {
	    	console.log(err);
	    	res.send("Error "+err);
	    }
	    else if(results==null){
	    	console.log("null results");
	    	res.send("Error null results");
	    }
	    else{
	    	QuestList=[]
		    console.log("All questions Got results : "+results.length);
		    res.send(results.length.toString());
		}
	}); 

});

app.get('/getQuestion', function(req, res) {
	if(req.body==null){
		console.log("req.body is null");
		res.send("Error req.body is null");
	}
	console.log("quizname : ",req.query.quiz_name," curr question : ",req.query.curr_quest,"next : ",req.query.next);
	quiz_name=req.query.quiz_name;
	curr_quest=req.query.curr_quest;
	next=req.query.next;
	if(next){
		qh.getNextQuestionsForQuiz(quiz_name,curr_quest,function(err, results){
		    if(err) {
		    	console.log(err);
		    	res.send("Error "+err);
		    }
		    else if(results==null){
		    	console.log("null results");
		    	res.send("Error null results");
		    }
		    else{
		    	QuestList=[]
			    console.log("Next question Got results : "+results.length);
			    res.send(results);
			}
		}); 
	}
	else{
		qh.getPrevQuestionsForQuiz(quiz_name,curr_quest,function(err, results){
		    if(err) {
		    	console.log(err);
		    	res.send("Error "+err);
		    }
		    else if(results==null){
		    	console.log("null results");
		    	res.send("Error null results");
		    }
		    else{
		    	QuestList=[]
			    console.log("Prev question Got results : "+results.length);
			    res.send(results);
			}
		}); 
	}
});


console.log("server running at localhost:3000 ....");
app.listen(3000);

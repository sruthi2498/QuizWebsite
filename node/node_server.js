var fs = require('fs');

var path = require('path');
var express=require("express");
var app = express();
var http=require("http").Server(app);
var bodyParser = require('body-parser');
var k=require("./keys_handler");
var qh=require("./quiz_handler");
var db=require("./db/node_db_main");
var io_home = require('socket.io')(http);
var qs=require("./quiz_session_handler");


app.use(bodyParser.urlencoded({ extended: true })); 



app.use('/js',express.static("js"));
app.use('/css',express.static("css"));

app.get('/home', function(req, res){
   res.sendFile('home.html', { root: path.join(__dirname, '../') });
});

app.post('/joinquizkey', function(req, res) {
	if(req.body==null)console.log("req.body is null");
	key=req.body.key;
	console.log("joinquizkey : ",req.body.key);
	k.checkValidKey(key,function(err, results){
	    if(err) {
	    	console.log(err);
	    	res.send("Error "+err);
	    }
	    else if(results==null){
	    	console.log("null results");
	    	res.send("Error null results");
	    }
	    else{
		    if(results.length==0){
		    	res.send("Invalid");
		    }
		    else {
		    	res.send("Valid");
		    }
		}
	}); 

});

app.get('/joinquiz', function(req, res){

   res.sendFile('sync.html', { root: path.join(__dirname, '../') });
});
app.get('/quizpage', function(req, res){
   res.sendFile('quizpage2.html', { root: path.join(__dirname, '../') });
});


app.get('/chooseQuiz', function(req, res){
	username=req.query.username;
   res.sendFile('choose_quiz.html', { root: path.join(__dirname, '../') });
});
app.get('/endQuiz', function(req, res){
   res.sendFile('end_quiz.html', { root: path.join(__dirname, '../') });
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
		    console.log("All questions Got results : "+results.length);
		    res.send(results.length.toString());
		}
	}); 

});

app.get('/getQuestion', function(req, res) {
	//get next question
	// increment attempted num for this question by 1
	// store the time for the prev question

	if(req.body==null){
		console.log("req.body is null");
		res.send("Error req.body is null");
	}
	console.log("quizname : ",req.query.quiz_name," curr question : ",req.query.curr_quest);
	quiz_name=req.query.quiz_name;
	curr_quest=req.query.curr_quest;
	next=req.query.next;
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
			    console.log("Next question Got results : "+results.length);
			    res.setHeader('Content-Type', 'application/json');
			    res.json(results);
			}
	}); 


	

});


app.get('/addPlayer1', function(req, res) {
	if(req.body==null){
		console.log("req.body is null");
		res.send("Error req.body is null");
	}
	player1=req.query.username;
	console.log("Adding Player 1 :",player1);
	qs.enterPlayer1Details(player1,function(err, results){
	    if(err) {
	    	console.log(err);
	    	res.send("Error "+err);
	    }
	    else if(results==null){
	    	console.log("null results");
	    	res.send("Error null results");
	    }
	    else{
		    console.log("quiz session : ",results[0].quiz_session_id);
		    res.send(results[0].quiz_session_id.toString());
		}
	}); 


});

app.get('/addPlayer2', function(req, res) {
	if(req.body==null){
		console.log("req.body is null");
		res.send("Error req.body is null");
	}
	player2=req.query.username;
	key=req.query.key;
	console.log("Adding Player 2 :",player2," with key : ",key);
	qs.enterPlayer2Details(player2,key,function(err, results){
	    if(err) {
	    	console.log(err);
	    	res.send("Error "+err);
	    }
	    else if(results==null){
	    	console.log("null results");
	    	res.send("Error null results");
	    }
	    else{
		    console.log("Ok");
		    res.send("Ok");
		}
	}); 


});

app.get('/getAllQuizzes', function(req, res) {
	if(req.body==null){
		console.log("req.body is null");
		res.send("Error req.body is null");
	}
	all_quizzes=qh.getAllQuizzes();
	res.setHeader('Content-Type', 'application/json');
	res.send(all_quizzes);



});



//Whenever someone connects this gets executed
io_home.on('connection', function(socket) {
   console.log('A user connected');

   //Send a message after a timeout of 2seconds
   // setTimeout(function() {
   //   socket.emit('testerEvent', { description: 'A custom event named testerEvent!'});
   // }, 2000);

   //Whenever someone disconnects this piece of code executed
   socket.on('disconnect', function () {
      console.log('A user disconnected');
   });

   socket.on('clientUsername', function(data) {
      console.log('clientUsername',data);
   });

   socket.on("userReady",function(data){
     console.log('user ready : ',data);
     socket.emit('opponentReady', data);
   });

});

http.listen(3000, function(){
  console.log('listening on localhost:3000');
});


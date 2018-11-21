var fs = require('fs');
var http=require("http");
var path = require('path');
var express=require("express");
var app = express();
var bodyParser = require('body-parser');
var vk=require("./valid_key");
var qh=require("./quiz_handler");
var db=require("./db/node_db_main");

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
	qh.getAllQuestionsForQuiz("quiz_d",function(err, results){
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
		    	// for(var i=0;i<results.length;i++){
		    	// 	QuestList.push(
			    // 	{
			    // 		  "quiz_id": results[i].quiz_id,
						 //  "question_id": results[i].question_id,
						 //  "question": results[i].question,
						 //  "option1": results[i].option1,
						 //  "option2": results[i].option2,
						 //  "option3": results[i].option3,
						 //  "option4": results[i].option4,
						 //  "correct_option": results[i].correct_option,
						 //  "num_attempted": results[i].num_attempted,
						 //  "num_correct": results[i].num_correct
			    // 	}
			    // );
		}
	}); 

});



	
// qh.getNextQuestionsForQuiz("quiz_d",2,function(err, results){
//     if(err) console.log(err);
//     else if(results==null)console.log("null results");
//     else{
//     	QuestList=[]
// 	    console.log("Next question Got results : "+results.length);
// 	    	for(var i=0;i<results.length;i++){
// 	    		QuestList.push(
// 		    	{
// 		    		  "quiz_id": results[i].quiz_id,
// 					  "question_id": results[i].question_id,
// 					  "question": results[i].question,
// 					  "option1": results[i].option1,
// 					  "option2": results[i].option2,
// 					  "option3": results[i].option3,
// 					  "option4": results[i].option4,
// 					  "correct_option": results[i].correct_option,
// 					  "num_attempted": results[i].num_attempted,
// 					  "num_correct": results[i].num_correct
// 		    	}
// 		    );
// 	    }
// 	    console.log("QuestList : ",QuestList);
// 	}   

// });

// qh.getPrevQuestionsForQuiz("quiz_d",2,function(err, results){
//     if(err) console.log(err);
//     else if(results==null)console.log("null results");
//     else{
//     	QuestList=[]
// 	    console.log("Prev question Got results : "+results.length);
// 	    	for(var i=0;i<results.length;i++){
// 	    		QuestList.push(
// 		    	{
// 		    		  "quiz_id": results[i].quiz_id,
// 					  "question_id": results[i].question_id,
// 					  "question": results[i].question,
// 					  "option1": results[i].option1,
// 					  "option2": results[i].option2,
// 					  "option3": results[i].option3,
// 					  "option4": results[i].option4,
// 					  "correct_option": results[i].correct_option,
// 					  "num_attempted": results[i].num_attempted,
// 					  "num_correct": results[i].num_correct
// 		    	}
// 		    );
// 	    }
// 	    console.log("QuestList : ",QuestList);
// 	}   

// });

console.log("server running at localhost:3000 ....");
app.listen(3000);

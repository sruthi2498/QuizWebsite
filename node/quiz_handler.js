var db=require("./db/node_db_main");

var quizzes=["quiz_a","quiz_b","quiz_c","quiz_d"];

exports.getQuizNames=function(){
	return ["quiz_a","quiz_b"];
}
var con=db.connectToDb();


exports.getAllQuestionsForQuiz=function(quiz_name,callback){
	console.log("get all questions");
	getAllQuestionsForQuiz2(quiz_name, function (err, result) {

        if(err || !result.length) return callback('error or no results');
        callback(null, result);

    });
};

 
function getAllQuestionsForQuiz2(quiz_name,callback){
	var sql="SELECT * FROM "+quiz_name;
	con.query(sql, function(err, rows) {
        if(err) return callback(err);
        callback(null, rows);
    });
}

exports.getAllQuizzes=function(){
	console.log("get qll questions");
	return [{
			"name":"quiz_a","desc":"This is quiz_a"
			},
			{
			"name":"quiz_b","desc":"This is quiz_b"
			},
			{
			"name":"quiz_c","desc":"This is quiz_c"
			},
			{
			"name":"quiz_d","desc":"This is quiz_d"
			}
	];
};

 


exports.getNextQuestionsForQuiz=function(quiz_name,curr_quest_num,callback){
	console.log("get next question for "+quiz_name+" curr_quest_num = ",curr_quest_num);
	getNextQuestionForQuiz2(quiz_name, curr_quest_num,function (err, result) {

        if(err || !result.length){
       // 	console.log("error : ",err," result.length : ",result.length);
        	return callback('error or no results');
        } 
        callback(null, result);

    });
};

 
function getNextQuestionForQuiz2(quiz_name,curr_quest_num,callback){

	next_q=(parseInt(curr_quest_num)+1).toString();

	// increment attempted for this question
	var sql="UPDATE "+quiz_name+" SET num_attempted=num_attempted+1 WHERE question_id = "+next_q;
	con.query(sql, function(err, rows) {
        if(err) return callback(err);
        console.log("updated row for ",next_q);
    });


	var sql="SELECT * FROM "+quiz_name +" WHERE question_id = "+next_q;
	con.query(sql, function(err, rows) {
        if(err) return callback(err);
        callback(null, rows);
    });
}

exports.storeTimeForQuestion=function(quiz_name,quiz_session_id,player,curr_quest_num,time,callback){
	console.log("setting time for player = "+player+" quiz = "+quiz_name+" curr_quest_num = ",curr_quest_num," time = "+time);
	storeTimeForQuestion2(quiz_name, quiz_session_id,player,curr_quest_num,time,function (err, result) {

        if(err || !result.length){
       // 	console.log("error : ",err," result.length : ",result.length);
        	return callback('error or no results');
        } 
        callback(null, result);

    });
};

 
function storeTimeForQuestion2(quiz_name,quiz_session_id,player,curr_quest_num,time,callback){

	curr_quest_num=parseInt(curr_quest_num,10);
    time=parseInt(time,10);
    var sql=""
    if(player=="player1"){
    	sql="UPDATE "+quiz_session+" SET player1_total_time=player1_total_time+time WHERE quiz_session_id="+quiz_session_id;
    	con.query(sql, function(err, rows) {
	        if(err) return callback(err);
	        callback(null, rows);
	    });
    }
    else if(player=="player2"){
    	sql="UPDATE "+quiz_session+" SET player2_total_time=player2_total_time+time WHERE quiz_session_id="+quiz_session_id;
    	con.query(sql, function(err, rows) {
	        if(err) return callback(err);
	        callback(null, rows);
	    });
    }
    else{
    	callback("error no such player");
    }

}

exports.getPlayerForUsername=function(username,quiz_session_id,callback){
	console.log("setting time for username = "+username+" quiz = "+quiz_name+" curr_quest_num = ",curr_quest_num," time = "+time);
	getPlayerForUsername2(username,quiz_session_id,function (err, result) {

        if(err || !result.length){
       // 	console.log("error : ",err," result.length : ",result.length);
        	return callback('error or no results');
        } 
        else if(result[0].player1==username){
        	callback(null, "player1");
        }
        else if(result[0].player2==username){
        	callback(null, "player2");
        }
        callback(null, "empty");
    });
};

 
function getPlayerForUsername2(username,quiz_session_id,callback){

	var sql="SELECT * FROM quiz_session WHERE quiz_session_id="+quiz_session_id;
	con.query(sql, function(err, rows) {
        if(err) return callback(err);
        callback(null,rows);
    });
}

// RowDataPacket {
//   quiz_id: null,
//   question_id: 2,
//   question: 'Test question 2',
//   option1: '3000 km/s',
//   option2: '2km/s',
//   option3: '0 km/s',
//   option4: '10 km/s',
//   correct_option: 3,
//   num_attempted: 0,
//   num_correct: 0 }

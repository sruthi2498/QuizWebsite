var db=require("./db/node_db_main");
var qs=require("./quiz_session_handler");


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

        if(err){
        	return callback(err);
        } 
        else if(!result.length){
       // 	console.log("error : ",err," result.length : ",result.length);
        	return callback('no results');
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


	/*var sql="SELECT * FROM "+quiz_name +" WHERE question_id = "+next_q;
	con.query(sql, function(err, rows) {
        if(err) return callback(err);
        callback(null, rows);
    });*/

    var sql="SELECT *,num_correct / num_attempted AS 'perct' FROM "+quiz_name+"     ORDER BY perct ";
    con.query(sql, function(err, rows) {
        if(err) {
        	return callback(err);
        }
        console.log(rows);
        callback(null, rows);
    });

}

exports.storeTimeForQuestion=function(username,quiz_name,quiz_session_id,curr_quest_num,time,callback){
	console.log("setting time for usenrame="+username+" quiz = "+quiz_name+" curr_quest_num = ",curr_quest_num," time = "+time);


	storeTimeForQuestion2(username,quiz_name, quiz_session_id,curr_quest_num,time,function (err, result) {
		if(err){
			console.log(err);
			callback(err);
		}
        callback(null, result);

    });
};

 
function storeTimeForQuestion2(username,quiz_name, quiz_session_id,curr_quest_num,time,callback){

	quiz_session_id=parseInt(quiz_session_id,10);
	curr_quest_num=parseInt(curr_quest_num,10);
    time=parseInt(time,10);
    var player="";

   
	var sql="SELECT * FROM quiz_session WHERE quiz_session_id="+quiz_session_id;
	con.query(sql, function(err, rows) {
        if(err){
        	 return callback(err);
        }
        else if(rows[0].player1==username){
        	player="player1";

        	sql="UPDATE quiz_session SET player1_total_time=player1_total_time+ "+time +" WHERE quiz_session_id="+quiz_session_id;
	    	con.query(sql, function(err, rows) {
		        if(err) return callback(err);
		        callback(null, rows);
		    }); 
        }
        else if(rows[0].player2==username){
        	player="player2";
        	sql="UPDATE quiz_session  SET player2_total_time=player2_total_time+ "+time +" WHERE quiz_session_id="+quiz_session_id;
	    	con.query(sql, function(err, rows) {
		        if(err) return callback(err);
		        callback(null, rows);
		    });
        }
        else{
	    	callback("error no such player");
	    }
    });

}

exports.userCorrect=function(quiz_name,curr_quest_num,callback){
	console.log("increment correctly answered");
	userCorrect2(quiz_name, curr_quest_num,function (err, result) {
		if(err){
			console.log(err);
			callback(err);
		}
        callback(null, result);

    });
};

 
function userCorrect2(quiz_name,curr_quest_num,callback){
	var sql="UPDATE "+quiz_name+" SET num_correct=num_correct+1 WHERE question_id="+curr_quest_num;
	con.query(sql, function(err, rows) {
        if(err) return callback(err);
        callback(null, rows);
    });
}

exports.getWinner=function(quiz_session_id,callback){
	console.log("get winner");
	getWinner2(quiz_session_id,function (err, result) {
		if(err){
			console.log(err);
			callback(err);
		}
        callback(null, result);

    });
};

 
function getWinner2(quiz_session_id,callback){
	var sql="SELECT * FROM quiz_session WHERE quiz_session_id="+quiz_session_id; 
	con.query(sql, function(err, rows) {
        if(err) return callback(err);
        callback(null, rows);
    });
}
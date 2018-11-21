var db=require("./db/node_db_main");


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

exports.getNextQuestionsForQuiz=function(quiz_name,curr_quest_num,callback){
	console.log("get next question");
	getNextQuestionForQuiz2(quiz_name, curr_quest_num,function (err, result) {

        if(err || !result.length){
        //	console.log("error : ",err," result.length : ",result.length);
        	return callback('error or no results');
        } 
        callback(null, result);

    });
};

 
function getNextQuestionForQuiz2(quiz_name,curr_quest_num,callback){
	next_q=curr_quest_num+1;
	var sql="SELECT * FROM "+quiz_name +" WHERE question_id = "+next_q;
	con.query(sql, function(err, rows) {
        if(err) return callback(err);
        callback(null, rows);
    });
}


exports.getPrevQuestionsForQuiz=function(quiz_name,curr_quest_num,callback){
	console.log("get next question");
	getPrevQuestionForQuiz2(quiz_name, curr_quest_num,function (err, result) {

        if(err || !result.length){
        //	console.log("error : ",err," result.length : ",result.length);
        	return callback('error or no results');
        } 
        callback(null, result);

    });
};

 
function getPrevQuestionForQuiz2(quiz_name,curr_quest_num,callback){
	next_q=curr_quest_num-1;
	var sql="SELECT * FROM "+quiz_name +" WHERE question_id = "+next_q;
	con.query(sql, function(err, rows) {
        if(err) return callback(err);
        callback(null, rows);
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

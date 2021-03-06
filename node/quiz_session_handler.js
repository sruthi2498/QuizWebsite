var db=require("./db/node_db_main");
var con=db.connectToDb();

exports.startSession=function(quiz_name,player1,player2,callback){
	console.log("starting a new session");
	startSession2(quiz_name,player1,player2, function (err, result) {

        if(err || !result.length) {
        	console.log(err);
        	return callback('error or no results');
        }
        callback(null, result);

    });
};

 
function startSession2(quiz_name,player1,player2,callback){
	
    var sql = "INSERT INTO quiz_session (quiz_name,player1,player2) VALUES ?";
    
    var values = [
        [quiz_name,player1,player2]
        
    ];
	con.query(sql, [values], function(err, rows) {
        if(err) return callback(err);
        console.log("start session Number of records inserted: " + rows.affectedRows);
    });

    var sql = "SELECT * FROM quiz_session  WHERE quiz_session_id= LAST_INSERT_ID()";
	con.query(sql, function(err, rows) {
        if(err) return callback(err);
        callback(null, rows);
        
    });

}



exports.enterPlayer1Details=function(player1,callback){
	console.log("starting a new session for player1");
	enterPlayer1Details_(player1,function (err, result) {

        if(err || !result.length) {
        	console.log(err);
        	return callback('error or no results');
        }
        callback(null, result);

    });
};

 
function enterPlayer1Details_(player1,callback){
	
    var sql = "INSERT INTO quiz_session (quiz_name,player1,player2) VALUES ?";
    
    var values = [
        ["NOT_CHOSEN",player1,"empty"]
        
    ];
	con.query(sql, [values], function(err, rows) {
        if(err) return callback(err);
        console.log("start session for player1 Number of records inserted: " + rows.affectedRows);
    });

    var sql = "SELECT * FROM quiz_session  WHERE quiz_session_id= LAST_INSERT_ID()";
	con.query(sql, function(err, rows) {
        if(err) return callback(err);
        callback(null, rows);
        
    });

}



exports.enterPlayer2Details=function(player2,quiz_session_id,callback){
	console.log("adding player 2....");
	enterPlayer2Details_(player2,quiz_session_id,function (err, result) {

	if(err){
		console.log(err);
		return callback("error");
	}
    callback(null, result);

    });
};

 
function enterPlayer2Details_(player2,quiz_session_id,callback){
	
	quiz_session_id=parseInt(quiz_session_id,10);
	var sql="UPDATE quiz_session SET player2=\""+player2+"\" WHERE quiz_session_id="+quiz_session_id;

	con.query(sql, function(err, rows) {
        if(err) return callback(err);
        callback(null, rows);
        
    });

}


exports.deleteSession=function(quiz_session_id,callback){
	console.log("deleteing session :",quiz_session_id);
	deleteSession2(quiz_session_id,function (err, result) {

	if(err){
		console.log(err);
		return callback("error");
	}
    callback(null, result);

    });
};

 
function deleteSession2(quiz_session_id,callback){
	
	quiz_session_id=parseInt(quiz_session_id,10);
	var sql="DELETE FROM quiz_session WHERE quiz_session_id="+quiz_session_id;

	con.query(sql, function(err, rows) {
        if(err) return callback(err);
        callback(null, rows);
        
    });

}


exports.setQuizAndMode=function(quiz_name,mode,quiz_session_id,callback){
	console.log("setting quiz_name :",quiz_name," and mode :",mode," for quiz_session_id : ",quiz_session_id);
	setQuizAndMode2(quiz_name,mode,quiz_session_id,function (err, result) {

	if(err){
		console.log(err);
		return callback("error");
	}
	console.log("set quiz_name");
    callback(null, result);

    });
};

 
function setQuizAndMode2(quiz_name,mode,quiz_session_id,callback){
	
	quiz_session_id=parseInt(quiz_session_id,10);
	quiz_name=quiz_name.toString();
	mode=mode.toString();
	var sql="UPDATE quiz_session SET quiz_name='"+quiz_name+"', mode='"+mode+"' WHERE quiz_session_id="+quiz_session_id;

	con.query(sql, function(err, rows) {
        if(err) return callback(err);
        callback(null, rows);
        
    });

}


exports.getSessionDetails=function(quiz_session_id,callback){
	console.log("get session for quiz_session_id : ",quiz_session_id);
	getSessionDetails2(quiz_session_id,function (err, result) {

	if(err){
		console.log(err);
		return callback("error");
	}
	else if(!result.length){
		console.log("no result");
		return callback("no result");
	}
    else callback(null, result);

    });
};

 
function getSessionDetails2(quiz_session_id,callback){
	
	quiz_session_id=parseInt(quiz_session_id,10);
	var sql="SELECT * FROM quiz_session WHERE quiz_session_id="+quiz_session_id;

	con.query(sql, function(err, rows) {
        if(err) return callback(err);
        callback(null, rows);
        
    });

}
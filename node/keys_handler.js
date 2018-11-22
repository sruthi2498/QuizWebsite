var db=require("./db/node_db_main");

var con=db.connectToDb();


exports.checkValidKey=function(key,callback){
	console.log("Check if valid session for key = "+key);
	checkValidKey2(key,function (err, result) {

        if(err) {
        	console.log(err);
        	return callback('error');
        }
        callback(null, result.length);

    });
};

 
function checkValidKey2(key,callback){
	
	key=parseInt(key, 10);
    var sql = "SELECT * FROM quiz_session WHERE quiz_session_id="+key;
    
	con.query(sql, function(err, rows) {
        if(err) return callback(err);
        callback(null, rows);
        
    });

}

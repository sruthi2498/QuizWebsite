var mysql = require('mysql');


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "charu1706",
  database:"webtech"
});

console.log("entering quiz session");
con.connect(function(err) {
  
    if (err) throw err;
    console.log("Connected!");

	var sql="CREATE TABLE quiz_session(quiz_session_id  INT AUTO_INCREMENT PRIMARY KEY,quiz_name VARCHAR(255), player1 VARCHAR(255),player2 VARCHAR(255),player1_curr_quest INT DEFAULT 0, player2_curr_quest INT DEFAULT 0,  player1_correct_num INT DEFAULT 0,  player2_correct_num INT DEFAULT 0,  player1_total_time INT DEFAULT 0, player2_total_time INT DEFAULT 0)";
  
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });

    var sql = "INSERT INTO quiz_session (quiz_name,player1,player2) VALUES ?";
    
    var values = [
        ['quiz_a','dummyPlayer1','dummyPlayer2'],
        
    ];
      
    con.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
    });

});





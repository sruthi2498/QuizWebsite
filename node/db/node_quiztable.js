var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "charu1706",
  database:"webtech"
});

con.connect(function(err) {
  
    if (err) throw err;
    console.log("Connected!");

    

	var sql="CREATE TABLE quiz_d (quiz_id INT,question_id INT AUTO_INCREMENT PRIMARY KEY, question VARCHAR(255), option1 VARCHAR(255), option2 VARCHAR(255), option3 VARCHAR(255), option4 VARCHAR(255), correct_option INT NOT NULL, num_attempted INT DEFAULT 0, num_correct INT DEFAULT 0)";
  
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });

    var sql = "INSERT INTO quiz_d (question,option1,option2,option3,option4,correct_option) VALUES ?";
    
    var values = [
        ['Test question 1', '30 km/s','24km/s','40000 m/s','10 km/s',1],
        ['Test question 2', '3000 km/s','2km/s','0 km/s','10 km/s',3],
        
    ];
      
    con.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
    });

});





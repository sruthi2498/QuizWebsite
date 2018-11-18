var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "username",
  password: "password",
  database:"webtech"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
	var sql="CREATE TABLE quiz_a (quiz_id INT,question_id INT AUTO_INCREMENT PRIMARY KEY, question VARCHAR(255), option1 VARCHAR(255), option2 VARCHAR(255), option3 VARCHAR(255), option4 VARCHAR(255), correct_option INT NOT NULL, num_attempted INT DEFAULT 0, num_correct INT DEFAULT 0)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });

var sql = "INSERT INTO quiz_a (question,option1,option2,option3,option4,correct_option) VALUES ?";
  var values = [
    ['What is the Speed of Earth ?', '30 km/s','24km/s','40000 m/s','10 km/s',1],
    ['What is the Speed of Sun ?', '3000 km/s','2km/s','0 km/s','10 km/s',3],
    ['What is the Speed of Light ?', '30 km/s','24km/s','40000 m/s','10 km/s',3],
    ['Who is President of South Sudan ?', 'Riek Machar','Elton John','Pagan Amum','Salva Kiir Mayardit',4],
   ['Who is President of Egypt ?', 'Riek Machar','Abdel Fattah el-Sisi','Pagan Amum','Salva Kiir Mayardit',2],
    ['Who is President of Mexico ?', 'Enrique Peña Nieto','Joaquin Guzman','Pagan Amum','Salva Kiir Mayardit',1],
    
  ];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
});

var sql="CREATE TABLE quiz_b (quiz_id INT,question_id INT AUTO_INCREMENT PRIMARY KEY, question VARCHAR(255), option1 VARCHAR(255), option2 VARCHAR(255), option3 VARCHAR(255), option4 VARCHAR(255), correct_option INT NOT NULL, num_attempted INT DEFAULT 0, num_correct INT DEFAULT 0)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });

var sql = "INSERT INTO quiz_b (question,option1,option2,option3,option4,correct_option) VALUES ?";
  var values = [
    ['What is the Speed of Earth again?', '30 km/s','24km/s','40000 m/s','10 km/s',1],
    ['What is the Speed of Sun again ?', '3000 km/s','2km/s','0 km/s','10 km/s',3],
    ['What is the Speed of Light again ?', '30 km/s','24km/s','40000 m/s','10 km/s',3],
    ['Who is President of South Sudan again ?', 'Riek Machar','Elton John','Pagan Amum','Salva Kiir Mayardit',4],
   ['Who is President of Egypt again?', 'Riek Machar','Abdel Fattah el-Sisi','Pagan Amum','Salva Kiir Mayardit',2],
    ['Who is President of Mexico again ?', 'Enrique Peña Nieto','Joaquin Guzman','Pagan Amum','Salva Kiir Mayardit',1],
    
  ];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
});

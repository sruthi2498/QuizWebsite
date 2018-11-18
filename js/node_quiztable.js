var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "srinjoy",
  database:"webtech"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
	var sql="CREATE TABLE questions (id INT AUTO_INCREMENT PRIMARY KEY, question VARCHAR(255), option1 VARCHAR(255), option2 VARCHAR(255), option3 VARCHAR(255), option4 VARCHAR(255), correct_option VARCHAR(255), num_attempted INT DEFAULT 0, num_correct INT DEFAULT 0)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });

var sql = "INSERT INTO questions (question,option1,option2,option3,option4,correct_option) VALUES ?";
  var values = [
    ['What is the Speed of Earth ?', '30 km/s','24km/s','40000 m/s','10 km/s','30km/s'],
    ['What is the Speed of Sun ?', '3000 km/s','2km/s','0 km/s','10 km/s','0 lm/s'],
    ['What is the Speed of Light ?', '30 km/s','24km/s','40000 m/s','10 km/s','4000 m/s'],
    ['Who is President of South Sudan ?', 'Riek Machar','Elton John','Pagan Amum','Salva Kiir Mayardit','Salva Kiir Mayardit'],
   ['Who is President of Egypt ?', 'Riek Machar','Abdel Fattah el-Sisi','Pagan Amum','Salva Kiir Mayardit','Abdel Fattah el-Sisi'],
    ['Who is President of Mexico ?', 'Enrique Peña Nieto','Joaquin Guzman','Pagan Amum','Salva Kiir Mayardit','Enrique Peña Nieto'],
    
  ];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
});

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


var sql="CREATE TABLE animals (quiz_id INT,question_id INT AUTO_INCREMENT PRIMARY KEY, question VARCHAR(255), option1 VARCHAR(255), option2 VARCHAR(255), option3 VARCHAR(255), option4 VARCHAR(255), correct_option INT NOT NULL, num_attempted INT DEFAULT 0, num_correct INT DEFAULT 0)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });

var sql = "INSERT INTO animals (question,option1,option2,option3,option4,correct_option) VALUES ?";

var values = [
    ['What is the Fastest Animal?', 'Lion','Jaguar','Cheetah','Human Beings',3],
    ['Which is the Largest Bird?', 'Ostrich','Penguin','Emu','Chicken',1],
    ['What is Heaviest Animal ?',  'Great White Shark','Elephant','Emu','Blue Whale',4],
    ['Which is the Second Heaviest Animal ?', 'Great White Shark','Elephant','Emu','Blue Whale',1],
   ['Which is the longest living animal ?', 'Turtle','Tortoise','Whale','Dinosaur',2],
    ['Which is the shortest living animal ?', 'Mosquito','Dragonfly','Mayfly','Ant',3],
  ['What is Light given out by animals called ?',  'Signal Beam','Flash','Photosynthesis','Bioluminiscence',4],
    ['Which is the Fastest Bird ?', 'Peregerine Falcon','Hawk','Bald Eagle','Vulture',1],
   ['Which is the Stringest Animal ?', 'Rhino','Dung Beetle','Tortoise','Hippo',2],
    ['Which is the largest living creature ever ?', 'T-Rex','Butterfly','Godzilla','Antman',3]
    
  ];


  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });

var sql="CREATE TABLE japan (quiz_id INT,question_id INT AUTO_INCREMENT PRIMARY KEY, question VARCHAR(255), option1 VARCHAR(255), option2 VARCHAR(255), option3 VARCHAR(255), option4 VARCHAR(255), correct_option INT NOT NULL, num_attempted INT DEFAULT 0, num_correct INT DEFAULT 0)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });

var sql = "INSERT INTO japan (question,option1,option2,option3,option4,correct_option) VALUES ?";

var values = [
    ['What is the Capital of Japan?', 'Tokyo','Kyoto','Osaka','Shinjuku',1],
    ['What is the Old Capital of Japan?', 'Tokyo','Kyoto','Osaka','Shinjuku',2],
    ['What is the Second Largest City of Japan?', 'Tokyo','Kyoto','Osaka','Shinjuku',3],
    ['How many colours does Japanese National Flag have ?', '2','1','3','4',1],
   ['Which is the Largest Religion in Japan ?', 'Buddhism','Shinto','Christian','Voodun',2],
    ['How many world heritage sites does Japan Have ?', '19','20','21','22',4],
  ['Which of these does Japan have higher than the United States ?',  'Cars','People','McDonalds','Nuclear Explosions',3],
    ['What is Japans National Flower ?', 'Rose','Cherry Blossom','Maple','Crimson',2],
   ['What is the currency of Japan ?', 'Yen','Renminbi','Bhata','Pesos',1],

    
  ];


  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
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

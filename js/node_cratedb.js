var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "rusername",
  password: "yourpassword"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE webtech", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});
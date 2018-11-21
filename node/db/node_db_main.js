var mysql = require('mysql');

exports.connectToDb=function(){
  console.log("connecting to DB");
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "charu1706",
    database:"webtech"
  });
  return con;
}










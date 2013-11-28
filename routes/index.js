
/*
 * GET home page.
 */
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/db.sqlite');
 

exports.index = function(req, res){
  db.get("SELECT * FROM temp_log", function(err, row) {
  	res.locals.row = row;
  	res.render('index', { title: 'Express' });
  });
  
};
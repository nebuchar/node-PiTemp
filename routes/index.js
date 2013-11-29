
/*
 * GET home page.
 */
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/db.sqlite');


function average(values, callback){
	var total = 0;
    var count = 0;
    values.forEach(function(value){
    	total += value;
    	count++;
    });
    return Math.round(total/count).toFixed(1);
}
function getMin(values, callback){
	var lowest  = null;
    values.forEach(function(value){
    	if (lowest === null || value < lowest) {
    		lowest = value;
    	}
    });
    return lowest.toFixed(1);
}
function getMax(values, callback){
	var highest  = null;
    values.forEach(function(value){
    	if (highest === null || value > highest) {
    		highest = value;
    	}
    });
    return highest.toFixed(1);
}
function getValues(date, callback){
	var values = [];
	var result = {};
	db.each("SELECT * FROM temp_log WHERE time > ?", date, function(err, row) {
		values.push(row.temp);
	}, function(err, num_rows){
		if(num_rows > 0){
			result.averages = average(values);
			result.lowest = getMin(values);
			result.highest = getMax(values);
		}
		callback(result);
	});
	
}
var time = new Date();
var valuesLast24Hours = getValues(time.setDate(new Date().getDate()-1), function(result){
	console.log('24h:');
	console.log(result);
});
var valuesLastWeek = getValues(time.setDate(new Date().getDate()-7), function(result){
	console.log('1w:');
	console.log(result);
});
exports.index = function(req, res){
  db.get("SELECT * FROM temp_log", function(err, row) {
  	res.locals.row = row;
  	res.render('index', { title: 'Express' });
  });
  
};
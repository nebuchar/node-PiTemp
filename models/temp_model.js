var async = require('async');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/db.sqlite');

var temp_model = {};

temp_model.average = function(values, callback){
	var total = 0;
    var count = 0;
    values.forEach(function(value){
    	total += value;
    	count++;
    });
    return Math.round(total/count).toFixed(1);
}
temp_model.getMin = function(values, callback){
	var lowest  = null;
    values.forEach(function(value){
    	if (lowest === null || value < lowest) {
    		lowest = value;
    	}
    });
    return lowest.toFixed(1);
}
temp_model.getMax = function(values, callback){
	var highest  = null;
    values.forEach(function(value){
    	if (highest === null || value > highest) {
    		highest = value;
    	}
    });
    return highest.toFixed(1);
}
temp_model.getValues = function(date, callback){
	var myself = this;
	var values = [];
	var result = {};
	db.each("SELECT * FROM temp_log WHERE time > ?", date, function(err, row) {
		values.push(row.temp);
	}, function(err, num_rows){
		if(num_rows > 0){
			result = {
				averages : myself.average(values),
				lowest: myself.getMin(values),
				highest: myself.getMax(values)
			}
		}
		callback(result);
	});
}
//Last 24h
temp_model.getValuesLast24Hours = function(callback){
	var time = new Date();
	this.getValues(time.setDate(new Date().getDate()-1), function(result){
		callback(null, result);
	});
	
} 
//Last week
temp_model.getValuesLastWeek = function(callback){
	var time = new Date();
	this.getValues(time.setDate(new Date().getDate()-7), function(result){
		callback(null, result);
	});
} 
//Last month
temp_model.getValuesLastMonth = function(callback){
	var time = new Date();
	this.getValues(time.setDate(new Date().getMonth()-1), function(result){
		callback(null, result);
	});
} 
temp_model.getAllValues = function(callback){
	var myself = this;
	async.parallel({
		valuesLast24Hours: temp_model.getValuesLast24Hours.bind(temp_model),
		valuesLastWeek: temp_model.getValuesLastWeek.bind(temp_model),
		valuesLastMonth: temp_model.getValuesLastMonth.bind(temp_model)
	}, callback);
	
}
//Export the module
module.exports = temp_model;

/*
 * GET home page.
 */

var temp_model = require('../models/temp_model');

exports.index = function(req, res){
	temp_model.getAllValues(function(data){
		console.log(data);
		res.render('index', { 
			title: 'Express',
			data: data 
		});
	});
	
};
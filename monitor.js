var exec = require('child_process').exec;
var child;

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/db.sqlite');

// Get temperature (see http://www.raspberrypi.org/phpBB3/viewtopic.php?f=45&t=25100)
child = exec("/opt/vc/bin/vcgencmd measure_temp", function (error, stdout, stderr) {
  if (error === null) {
  	var matches = stdout.match(/^temp=([\d.]+)/);
    var temp = parseFloat(matches[1]);
    var time = new Date().getTime();
    db.run("INSERT INTO temp_log VALUES ($time, $temp)", {
        $time: time,
        $temp: temp
    });
  }
  else{
	  console.log('exec error: ' + error);
  }
});
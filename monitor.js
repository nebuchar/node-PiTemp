var exec = require('child_process').exec;
var child;

// Get temperature (see http://www.raspberrypi.org/phpBB3/viewtopic.php?f=45&t=25100)
child = exec("/opt/vc/bin/vcgencmd measure_temp", function (error, stdout, stderr) {
  console.log('stdout: ' + stdout);
  console.log('stderr: ' + stderr);
  if (error !== null) {
    console.log('exec error: ' + error);
  }
  else{
	  var matches = stdout.match("/^temp=([\d.]+)/");
	  var temp = matches[1];
	  var time = new Date().getTime();
	  console.log(temp);
  }
});
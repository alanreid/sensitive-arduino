
var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , serialport = require("serialport")
  , SerialPort = serialport.SerialPort
  , Sensitive = require('./sensitive.js').Sensitive;


var serialPort = new SerialPort('/dev/tty.usbmodemfa131', {
  baudrate: 57600,
  parser: serialport.parsers.readline("\n") 
});


Sensitive.init(io, serialPort);

server.listen(8080);

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/public/index.html');
});  

app.get('/sensitive.js', function(req, res) {
  res.sendfile(__dirname + '/public/js/sensitive.js');
});  

var serialport = require('serialport');
var portName = 'COM3';
var sp = new serialport.SerialPort(portName, {
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false,
    parser: serialport.parsers.readline("\r\n")
});

var io = require('socket.io-client');
var client = io.connect('https://linen-flux-156309.appspot.com:8080', {reconnect: true});

client.on('connect', function(socket){
   console.log("Connected to server");
});

sp.on('data', function(input) {
    console.log(input);
    client.emit('pi', input);

});
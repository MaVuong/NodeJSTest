var CCPlayer=require('./CCLIB/CCPlayer');
var CCVector=require('./CCLIB/CCVector');
var CCBullet=require('./CCLIB/CCBullet');
var CCCode=require('./CCLIB/CCCode');
var CCRoom=require('./CCLIB/CCRoom');

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http,{'pingInterval': 2000, 'pingTimeout': 5000});
app.use(express.static(__dirname + '/DataGame'));

http.listen(2020, function(){
	console.log('listening on : 2020');
});

var thutuWaiting=0;
var List_CODE={};
var ListWAITTING_STOCKET={};

var LIST_SOCKET={};

var room_name_cout=0;
var LISTROOM={};

var adminID=0;
var AMINDCONNECT={};

io.on('connection', function(socket_client){
	var buf = new Buffer('AB');
	//var buffer = new Buffer("I'm a string!")
	socket_client.emit('TestReadData',"FUCK LKAJLKDSLJLKS");
	LIST_SOCKET["X"]=socket_client;



	socket_client.on('MyInfo',function(data_client){
		console.log("data_clientL:"+data_client);
	});
});
setInterval(function(){
	for(var i in LIST_SOCKET){
		var usr_tmp=LIST_SOCKET[i];
		var obj=new Buffer('ABCCAADDAABCCAADDAABCCAADDAABCCAADDAABCCAADDAABCCAADDAABCCAADDAABCCAADDAABCCAADDAABCCAADDAABCCAADDAABCCAADDAABCCAADDAABCCAADDAABCCAADDAABCCAADDAABCCAADDAABCCAADDA','ascii');
		usr_tmp.emit('UpdatePosition',obj);
	}

},60);














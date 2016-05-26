var myexpressCN = require('express');
var app = myexpressCN();
var serv = require('http').Server(app);

app.get('/',function(req, res) {
	res.sendFile(__dirname + '/content.html');
});
app.use('/ios',myexpressCN.static(__dirname + '/mobile'));

serv.listen(2000);
console.log("Server bat dau khoi chay");

var thutu=0;

var USR_LIST={};

var PLAYER_LIST={};
var Player=function(id){
	var self={
		x:50,
		y:50,
		id:id,
		name:"USR:"+id,

		MvUp:false,
		MvDown:false,
		MvLeft:false,
		MvRight:false,
		mySpeed:10
	}
	self.updaetMyPosition=function(){
		if (self.MvUp) 
			self.y-=self.mySpeed;
		if (self.MvDown) 
			self.y+=self.mySpeed;
		if (self.MvLeft) 
			self.x-=self.mySpeed;
		if (self.MvRight) 
			self.x+=self.mySpeed;
	}


	return self;
}




var io=require('socket.io')(serv,{});

io.sockets.on('connection',function(userSK){// user sockitConnection
	thutu+=1;
	if (thutu>10000000) {
		thutu=0;
	}
	userSK.id=thutu;
	USR_LIST[userSK.id]=userSK;


	var tmp_Player=Player(userSK.id);
	PLAYER_LIST[userSK.id]=tmp_Player;


	userSK.on('keyPress',function(data_client){
		//console.log("dataclient.inputId:  "+dataclient.inputId);
		if (data_client.inputId==='left')
			tmp_Player.MvLeft=data_client.state;
		else if (data_client.inputId==='right')
			tmp_Player.MvRight=data_client.state;
		else if (data_client.inputId==='down')
			tmp_Player.MvDown=data_client.state;
		else if (data_client.inputId==='up')
			tmp_Player.MvUp=data_client.state;
	});



	
	userSK.on('disconnect',function(){
		delete USR_LIST[userSK.id];
		delete PLAYER_LIST[userSK.id];
	});
});



setInterval(function(){
	var pack=[];
	for(var i  in PLAYER_LIST){
		var tmp_play=PLAYER_LIST[i];
		tmp_play.updaetMyPosition();
		pack.push({
			x:tmp_play.x,
			y:tmp_play.y,
			usr_name:tmp_play.name
		}
		);
	}
	for(var i  in USR_LIST){
		var usr_tmp=USR_LIST[i];
		usr_tmp.emit('UpdatePosition',pack);
	}
	


},1000/25);
















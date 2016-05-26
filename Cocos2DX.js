var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static(__dirname + '/DataGame'));

http.listen(2000, function(){
	console.log('listening on : 2000');
});


// var myexpressCN = require('express');
// var app = myexpressCN();
// var serv = require('http').Server(app);
// app.get('/',function(req, res) {
// 	//res.sendFile(__dirname + '/databuild.html');
// 	res.write("FUCK ALL");
// 	res.end();
// });
// app.use('/ios',myexpressCN.static(__dirname + '/mobile'));
// serv.listen(2000);
// var io=require('socket.io')(serv,{log: false });



console.log("Server bat dau khoi chay");


var Player=function(id){
	var self={
		x:-400,
		y:-40,
		r:0,
		numberID:id,
		name:"USR:"+id,
		typeTank:1,
		MVstt:0,
		isRemove:false,
		mySpeed:0.8
	}
	self.updateMyPosition=function(){
		if (self.MVstt==1) 
			{
				self.x+=self.mySpeed;
				self.r=0;
				if (self.x>550) {
					self.x=-550;
				}
			}
		else if (self.MVstt==2) 
			{
				self.y-=self.mySpeed;
				self.r=90;
				if (self.y<-280) {
					self.y=280;
				}
			}
		else if (self.MVstt==3) 
			{
				self.x-=self.mySpeed;
				self.r=180;
				if (self.x<-550) {
					self.x=550;
				}
			}
		else if (self.MVstt==4) 
			{
				self.y+=self.mySpeed;
				self.r=-90;
				if (self.y>280) {
					self.y=-280;
				}
			}
		
	}


	return self;
}



var countTypePlay=1;
var countConnect=1;
var USR_LIST={};
var PLAYER_LIST={};



io.on('connection', function(socket_client){
	if (countTypePlay>5) {
		countTypePlay=1;
	}else if (countTypePlay<1) {
		countTypePlay=5;
	}

	//console.log('a user connected');
	countConnect=countConnect+1;
	if (countConnect>100000) {
		countConnect=0;
	}
	socket_client.numberID=""+countConnect;
	USR_LIST[socket_client.numberID]=socket_client;

	var player_tmp=Player(socket_client.numberID);
	PLAYER_LIST[socket_client.numberID]=player_tmp;
	player_tmp.typeTank=""+countTypePlay;

	

	socket_client.emit('LoadUserInfo', socket_client.numberID);

	countTypePlay=countTypePlay+1;


	socket_client.on('changeDir',function(data_client){
		player_tmp.MVstt=data_client;
	});


	socket_client.on('disconnect',function(){
		var player_out=PLAYER_LIST[socket_client.numberID];
		player_out.isRemove=true;// ko hieu sao khong xoa duoc nen dat status nay o day
		delete USR_LIST[socket_client.numberID];
		delete PLAYER_LIST[socket_client.numberID];
		console.log('user  '+socket_client.numberID+' has logout ');
	});
});



setInterval(function(){
	var pack=[];
	for(var i  in USR_LIST){
		var player_tmp=PLAYER_LIST[i];
		if (player_tmp.isRemove) {
			continue;
		}
		player_tmp.updateMyPosition();
		pack.push({
			x:player_tmp.x,
			y:player_tmp.y,
			id:player_tmp.numberID,
			r:player_tmp.r,
			typeTank:player_tmp.typeTank
		}
		);

		//pack.push(player_tmp.x+'|'+player_tmp.y+'|'+player_tmp.r+'|'+player_tmp.typeTank+'|'+player_tmp.id);
	}

	


	for(var i  in USR_LIST){
		var usr_tmp=USR_LIST[i];
		usr_tmp.emit('UpdatePosition',pack);
	}




	// for(var i  in USR_LIST){
	// 	var usr_tmp=USR_LIST[i];
	// 	var player_tmp=PLAYER_LIST[i];
	// 	usr_tmp.emit('UpdatePosition',player_tmp.x+'|'+player_tmp.y+'|'+player_tmp.r);
	// }
	


},1000/50);

















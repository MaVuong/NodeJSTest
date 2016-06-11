var CCPlayer=require('./CCLIB/CCPlayer');
var CCVector=require('./CCLIB/CCVector');
var CCBullet=require('./CCLIB/CCBullet');


var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static(__dirname + '/DataGame'));

http.listen(2000, function(){
	console.log('listening on : 2000');
});



console.log("Server bat dau khoi chay----->"+process.hrtime());
var hrTime = process.hrtime()




var count_Bullet=1;// id cua vien dan tang dan, neu lon hon 100000 chang han thi reset ve =0
var count_Connect=1;

var USR_LIST={};
var PLAYER_LIST={};
var BULLETFIRE_LIST={};


io.on('connection', function(socket_client){
	count_Connect=count_Connect+1;
	if (count_Connect>1000000) {
		count_Connect=0;
	}
	socket_client.numberID=""+count_Connect;
	USR_LIST[socket_client.numberID]=socket_client;

	var player_tmp=new CCPlayer(socket_client.numberID);
	PLAYER_LIST[socket_client.numberID]=player_tmp;


	socket_client.emit('LoadUserInfo', socket_client.numberID);

	socket_client.on('changeDir',function(data_client){
		player_tmp.lifetime=20;
		player_tmp.chuanhoagoc(data_client);
	});

	socket_client.on('updateUserName',function(data_client){
		console.log("Player ID :"+player_tmp.numberID+ " has updated name: "+data_client);
		player_tmp.lbdisplay=data_client;
	});



	socket_client.on('fireTarget',function(gunrotated){
		player_tmp.changeRotationGun(gunrotated);
		player_tmp.lifetime=20;
	});

	socket_client.on('disconnect',function(){
		var player_out=PLAYER_LIST[socket_client.numberID];
		delete USR_LIST[socket_client.numberID];
		delete PLAYER_LIST[socket_client.numberID];
		console.log('user  '+socket_client.numberID+' has logout ');
	});
});



var time_step=30;
setInterval(function(){
	var dtSecond=time_step/1000;
	var pack_info_tank=[];
	var nameremove=null;
	for(var i  in PLAYER_LIST){
		var player_tmp=PLAYER_LIST[i];
		if (player_tmp.lifetime<0) {
			nameremove=i;
		}
		player_tmp.updatePosition(dtSecond);
		var rtFire=player_tmp.updateGunRotationAndFire(dtSecond);
		pack_info_tank.push({
			x:player_tmp.pos.x,
			y:player_tmp.pos.y,
			id:player_tmp.numberID,
			r:player_tmp.r,
			typeTank:player_tmp.typeTank,
			lbdisplay:player_tmp.lbdisplay,
			level:player_tmp.level,
			score:player_tmp.score,
			gR:player_tmp.gunRotation
		}
		);

		if (rtFire===1) {
			count_Bullet++;
			if (count_Bullet>100000) {
				count_Bullet=1;
			}
			var gocban=player_tmp.gunRotation;
			var xbegin=player_tmp.pos.x;
			var ybegin=player_tmp.pos.y;
			var diemdat=new CCVector(xbegin,ybegin);
			//console.log("add bullet:"+count_Bullet+" fire from id:"+i);
			var dan=new CCBullet(i,count_Bullet);
			
			dan.setMoveDir(gocban,diemdat);
			BULLETFIRE_LIST[dan.numberID]=dan;
		}
	}

	var pack_removebullet=[];
	var pack_info_bullet=[];
	for(var i  in BULLETFIRE_LIST){
		var bl=BULLETFIRE_LIST[i];

		bl.updatePosition(dtSecond);
		if (bl.isRemove) {
			pack_removebullet.push(i);
		}
		
		pack_info_bullet.push({
				x:bl.pos.x,
				y:bl.pos.y,
				opp:bl.opacity,
				id:bl.numberID
		});


		// if (bl.isRemove) {
		// 	pack_removebullet.push(i);
		// }else{
		// 	pack_info_bullet.push({
		// 		x:bl.pos.x,
		// 		y:bl.pos.y,
		// 		id:bl.numberID
		// 	});

		// }
		
	}


	var letMax=pack_removebullet.length;
	for (var i = 0; i < letMax; i++) {
		var iddelete=pack_removebullet[i];
		delete BULLETFIRE_LIST[iddelete];
	}
	pack_removebullet=[];

	
	for(var i  in USR_LIST){
		var usr_tmp=USR_LIST[i];
		usr_tmp.emit('UpdatePosition',{numberID:usr_tmp.numberID,tank:pack_info_tank,bullet:pack_info_bullet});
	}


	if (nameremove!==null) {
		console.log("delete iser id : "+nameremove);
		var clientx=USR_LIST[nameremove];
		clientx.disconnect();
		delete USR_LIST[nameremove];
		delete PLAYER_LIST[nameremove];
	}



},time_step);

















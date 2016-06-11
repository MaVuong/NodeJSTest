// var cc=require('./CCLIB/CCLIB');


// // var x1=1;
// // var y1=6;
// // var x2=4;
// // var y2=2;
// // var distance=Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2));

// var num=-7392;
// var sodem=Math.abs(num);
// console.log("sodem "+sodem+ " num : "+num);


var CCBullet=require('./CCLIB/CCBullet');


// var gocban=player_tmp.gunRotation;
// var xbegin=player_tmp.pos.x;
// var ybegin=player_tmp.pos.y;
// var diemdat=new CCPlayer(xbegin,ybegin);
// console.log("add bullet:"+count_Bullet+" fire from id:"+i);
// var dan=new CCBullet(i,count_Bullet);

// dan.setMoveDir(gocban,diemdat);



 
/*
var DANHSACH={};

var CCPlayer=require('./CCLIB/CCPlayer');
var CCVector=require('./CCLIB/CCVector');


// Nếu 2 xe tăng va chạm vào nhau thì sẽ có ít nhất 1 trong 2 xe chết ví dụ xe 1 có 70 máu, xe 2 có 40 máu thì xe 2 sẽ bị nổ chết còn xe 1 sẽ bị mất 40 máu 


var listplayer=[];

var play1=new CCPlayer("p1");
play1.pos=new CCVector(3,2);
listplayer.push(play1);

var play2=new CCPlayer("p2");
play2.pos=new CCVector(5,-1);
listplayer.push(play2);


var play3=new CCPlayer("p3");
play3.pos=new CCVector(0,-1);
listplayer.push(play3);


var play4=new CCPlayer("p4");
play4.pos=new CCVector(1,-1);
listplayer.push(play4);



var play4=new CCPlayer("p4");
play4.pos=new CCVector(1,-1);
listplayer.push(play4);


var lengthlist=listplayer.length;


for (var i = 0; i < lengthlist; i++) {
	var tmp=listplayer[i]
	console.log("name :"+tmp.name);
}



var distan=play1.pos.getDistance(play2.pos);
console.log("distan "+distan);

*/



/*

console.log("this.r : "+this.r);
	this.r=Math.round(this.r);
	this.r=this.r%360;
	this.r=Math.round(this.r);
	if (Math.abs(this.r)>360) {
		this.r=0;
	}
	this.MVSTT=huongquay;
	console.log("huongquay:"+this.MVSTT);
	if (this.r<0) {
		this.r=360+this.r;
	}
	var getTargetDuong=null;
	var getTargetAm=null;
	if (this.MVSTT==1){
			getTargetDuong=0;
			getTargetAm=0;
		}
	else if (this.MVSTT==2){
			getTargetDuong=90;
			getTargetAm=-270;
		}
	else if (this.MVSTT==3){
			getTargetDuong=180;
			getTargetAm=-180
		}
	else if (this.MVSTT==4) {
			getTargetDuong=270;
			getTargetAm=-90;
		}
	console.log("getTargetDuong : "+getTargetDuong+ " getTargetAm: "+getTargetAm);	
	if (getTargetDuong===null) {
		return;
	}
	var hieuD=Math.abs(this.r-getTargetDuong);
	var hieuA=Math.abs(this.r-getTargetAm)
	if (hieuD<hieuA) {
		this.r_target=getTargetDuong;
		this.tangstt=1;
		if (hieuD<5) {
			this.tangstt=0;
		}
	}else{
		this.r_target=getTargetAm;
		this.tangstt=2;
		if (hieuA<5) {
			this.tangstt=0;
		}
	}

	console.log("this.tangstt : "+this.tangstt+ " this.r_target "+this.r_target);


*/










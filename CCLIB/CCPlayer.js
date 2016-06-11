
var CCVector=require('./CCVector');

function CCPlayer(id){
	this.numberID=""+id;
	this.pos=new CCVector(0,0);
	this.r=0;
	this.w=25;
	this.h=22;
	this.r_target=0;
	this.tangstt=0;
	this.name="USR_"+id;
	this.level=1;
	var beginR=Math.floor(Math.random() * 4) + 1;
	this.MVSTT=beginR;
	this.mySpeed=30;//30-80
	this.lbdisplay="";
	this.score=0;

	this.gunRotation=beginR*90-90;
	this.gunRTarget=0;
	this.gunstt=-1;
	this.lifetime=10;

	this.roomID="";
	this.zoneid=0;

	this.pack_bullet=[];
	this.pack_player=[];
	this.pack_items=[];
	this.pack_obs=[];
	this.type=1;// 1 la player binh thuong, -1 la Boot
	this.isCollisder=false;
}
CCPlayer.prototype.changeRotationGun=function(newroation){	
	if (Math.abs(this.gunRotation)>360) {
		this.gunRotation=this.gunRotation%360;
	}
	this.gunRotation=Math.round(this.gunRotation);
	if (this.gunRotation<0) {
		this.gunRotation=this.gunRotation+360;
	}

	var hieukhoangcach=this.gunRotation-newroation;
	if (hieukhoangcach>0) {
		if (Math.abs(hieukhoangcach)>180) {
			var hieukc2=360-Math.abs(hieukhoangcach);
			this.gunRTarget=hieukc2;
		}else{
			this.gunRTarget=-Math.abs(hieukhoangcach);
		}
	}else{
		if (Math.abs(hieukhoangcach)>180) {
			var hieukc2=360-Math.abs(hieukhoangcach);
			this.gunRTarget=-hieukc2;
		}else{
			this.gunRTarget=Math.abs(hieukhoangcach);
		}
	}

	if (this.gunRTarget>0) {
		this.gunstt=1;
	}else{
		this.gunstt=2;
	}
	if (Math.abs(this.gunRTarget)<5) {
		this.gunRotation=newroation;
		this.gunstt=0;
	}
	//console.log("this.gunRotation : "+this.gunRotation +" this.gunRTarget : "+this.gunRTarget);
	//console.log("newroation: "+newroation+" this.gunstt: "+this.gunstt);


}
CCPlayer.prototype.updateGunRotationAndFire=function(dttime){
	if (this.gunstt<0) {
		return 0;
	}
	var giatrilon=Math.abs(this.gunRotation);
	if (giatrilon>720) {
		console.log("loi dat vi tri nong sung roi");
	}
	if (this.gunstt>0) {
		var dt_rt=Math.round(300*dttime);

		if (this.gunstt==1) {
			var goctamthoi=this.gunRTarget-dt_rt;
			if (goctamthoi<0) {
				this.gunRotation=this.gunRotation+this.gunRTarget;
				this.gunRTarget=0;
				this.gunstt=0;// fire
			}else{
				this.gunRTarget=goctamthoi;
				this.gunRotation=this.gunRotation+dt_rt;
			}
		}else{
			var goctamthoi=this.gunRTarget+dt_rt;
			if (goctamthoi>0) {
				this.gunRotation=this.gunRotation+this.gunRTarget;
				this.gunRTarget=0;
				this.gunstt=0;// fire
			}else{
				this.gunRTarget=goctamthoi;
				this.gunRotation=this.gunRotation-dt_rt;
			}
		}

	}

	if (this.gunstt==0) {
		//fire 
		//console.log("Fire ksjdklasdjlaskjdlask");
		this.gunstt=-1;
		return 1;
	}else{
		return 0;
	}


}
CCPlayer.prototype.chuanhoagoc=function(huongquay){
	if (Math.round(this.r_target)!=0) {
		return;
	}
	var pt1=this.MVSTT%2;
	var pt2=huongquay%2;
	if (pt2==pt1) {
		this.MVSTT=huongquay;
		return;
	}

	var goctoi=0;
	if (this.MVSTT==1) {//0
		if (huongquay==2) {
			goctoi=90;
		}else{
			goctoi=-90;
		}
	}else if (this.MVSTT==2) {//90
		if (huongquay==3) {
			goctoi=90;
		}else{
			goctoi=-90;
		}
	}else if (this.MVSTT==3) {//180
		if (huongquay==2) {
			goctoi=-90;
		}else{
			goctoi=90;
		}
	}else if (this.MVSTT==4) {//270
		if (huongquay==3) {
			goctoi=-90;
		}else{
			goctoi=90;
		}
	}
	this.r_target=goctoi;
	this.tangstt=2;
	this.MVSTT=huongquay;
}
CCPlayer.prototype.updatePosition=function(df_movetime){
	this.lifetime=this.lifetime-df_movetime;

	
	if (this.r_target>0) {
		var goctru=Math.round(df_movetime*320);
		this.r_target=this.r_target-goctru;
		if (this.r_target<5) {
			this.r_target=0;
			this.tangstt=0;			
		}else{
			this.r=this.r+goctru;
		}		
	}else if (this.r_target<0){
		var goctru=Math.round(df_movetime*320);
		var lastTG=this.r_target;
		this.r_target=this.r_target+goctru;
		if (this.r_target>-5) {
			this.tangstt=0;	
			this.r_target=0;
		}else{
			this.r=this.r-goctru;
		}
	}


	if (this.tangstt>0) {
		return;
	}
	if (this.MVSTT==1){
			this.pos.x+=this.mySpeed*df_movetime;
			this.r=0;
		}
	else if (this.MVSTT==2) 
		{
			this.pos.y+=this.mySpeed*df_movetime;
			this.r=90;
		}
	else if (this.MVSTT==3) 
		{
			this.pos.x-=this.mySpeed*df_movetime;
			this.r=0;
		}
	else if (this.MVSTT==4) 
		{
			this.pos.y-=this.mySpeed*df_movetime;
			this.r=90;
		}
}

CCPlayer.prototype.collisderLimitPos=function(dtlimit){
	if (this.tangstt>0) {
		return;
	}
	if (this.MVSTT==1){
			this.pos.x-=dtlimit;
		}
	else if (this.MVSTT==2) 
		{
			this.pos.y-=dtlimit;
		}
	else if (this.MVSTT==3) 
		{
			this.pos.x+=dtlimit;
		}
	else if (this.MVSTT==4) 
		{
			this.pos.y+=dtlimit;
		}
}


module.exports=CCPlayer;
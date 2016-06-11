var CCVector=require('./CCVector');

function CCBullet(id_player,id_bullet){
	this.numberID=""+id_bullet;
	this.idplayer=id_player;
	this.pos=null;
	this.lengthMove=0; 
	this.r=5;
	this.gocdichuyen=0;// tinh bang radian 
	this.speed=400;//velocity
	this.isNew=true;
	this.opacity=1;
	this.isRemove=false;
}

CCBullet.prototype.setMoveDir=function(goc_degree,beginPos){
	this.gocdichuyen=(goc_degree*3.141592)/180;
	this.pos=beginPos;
}
CCBullet.prototype.updatePosition=function(delta_time){
	// if (this.isNew) {
	// 	this.isNew=false;
	// 	return;
	// }
	if (this.isRemove) {
		return;
	}

	var lengtMV=delta_time*this.speed;
	this.lengthMove=this.lengthMove+lengtMV;
	var newX=this.pos.x+ lengtMV*Math.cos(this.gocdichuyen);
	var newY=this.pos.y+lengtMV*Math.sin(this.gocdichuyen);
	this.pos.x=Math.round(newX);
	this.pos.y=Math.round(newY);
	if (this.lengthMove>150) {
		var tile=this.lengthMove-150;
		this.opacity=1-tile*0.01;
		if (this.opacity<0) {
			this.opacity=0;
		}
	}
	if (this.lengthMove>300) {
		this.isRemove=true;
	}
}


module.exports=CCBullet;


// console.log("---------------------XXXXXX");
function getMapAround(location){
	var cx=location%10;
	var cy=Math.floor(location/10);

	var arrayGet=[];
	arrayGet.push(location-10-1);
	arrayGet.push(location-10);
	arrayGet.push(location-10+1);
	arrayGet.push(location-1);
	arrayGet.push(location);
	arrayGet.push(location+1);
	arrayGet.push(location+10-1);
	arrayGet.push(location+10);
	arrayGet.push(location+10+1);
	var rtArray=[];
	for (var i = 0; i < 9; i++) {
		var num_validate=arrayGet[i];
		var cvx=num_validate%10;
		var cvy=Math.floor(num_validate/10);
		var distance=Math.sqrt(Math.pow(cvx-cx,2)+Math.pow(cvy-cy,2));
		if (num_validate>=0&&num_validate<=99&&distance<2) {
			rtArray.push(num_validate);
		}
	}
	return rtArray;
}
function logObject(obj){
	console.log("info :x=%s , y=%s, w=%s, h=%s",obj.x,obj.y,obj.w,obj.h);
}
function kiemTraVaCham(objC1,objC2){
	var dtX=Math.abs(objC1.x-objC2.x);
	var dtY=Math.abs(objC1.y-objC2.y);
	var kcW=objC1.w/2+objC2.w/2;
	var kcH=objC1.h/2+objC2.h/2;
	
	if (dtX<kcW&&dtY<kcH) {
		return true;
	}else{
		return false;
	}
}
function distace2Object(obj1,obj2){
	return Math.sqrt(Math.pow(obj1.x-obj2.x,2)+Math.pow(obj1.y-obj2.y,2));
}
function MapConvertUnit(x,y){
	var xp=Math.floor(x/300);// map tam thoi co kich thuco la 3000,2000 
	var yp=Math.floor(y/200);
	var index=Math.floor(yp*10+xp);
	if (index>99||xp>9||yp>9) {
		console.log("convert to Unit error, xp=%s yp=%s index=%s",xp,yp,index);
		return -1;
	}else{
		return index;
	}
}


function CCMap(){
	this.listArrOBJ=null;// Object chuong ngai vat
	this.listArrFree=null;
	this.listArrUnit=null;

}
CCMap.prototype.LoadFile=function(){
	fs = require('fs')
	var fs = require('fs');
	var obj = JSON.parse(fs.readFileSync('./Map/mapgame1.json', 'utf8'));
	this.listArrOBJ=obj.mapObstacle;
	this.listArrFree=obj.mapFreeRect;
	this.listArrUnit=obj.Unit;

	var tinhtoan=0;
	var kt=false;
	var maxlegthFree=this.listArrFree.length;
	for (var kfree = 0; kfree <maxlegthFree ; kfree++) {
		var obj_free1=this.listArrFree[kfree];
		var allObjectArround=this.getAllObjectAroundMe(obj_free1.x,obj_free1.y);
		for (var i = 0; i < allObjectArround.length; i++) {
			var tmpObj=allObjectArround[i];

			var ktvc=kiemTraVaCham(tmpObj,obj_free1);
			if (ktvc) {
				console.log("co va cham roi %s %s",tmpObj.id,obj_free1.id);
				logObject(tmpObj);
				logObject(obj_free1);
			}
			tinhtoan=tinhtoan+1;
		}
	}
	var soObject=this.listArrOBJ.length+this.listArrFree.length;
	console.log("tinhtoan: %s so object : %s",tinhtoan,soObject);
	

	//console.log("listOBJ: "+this.listOBJ[88].id);
}


CCMap.prototype.getAllObjectAroundMe=function(x,y){
	var p2unit=MapConvertUnit(x,y);// convert thanh vi tri don vi 0-99
	var arrIndexArrount=getMapAround(p2unit);//lay ra cac don vi xung quanh no
	var maxIAr=arrIndexArrount.length;
	var AllObjectRT=[];
	for (var ir = 0; ir < maxIAr; ir++) {
		var indexOfU=arrIndexArrount[ir];// lay ra thu tu cua array unit
		var groupUnit=this.listArrUnit[indexOfU];// lay ra tu group va add no vao allObject
		var maxLUnit=groupUnit.length;
		for (var iu = 0; iu < maxLUnit; iu++) {
			AllObjectRT.push(groupUnit[iu]);
		}
	}
	return AllObjectRT;
}












module.exports=CCMap;




















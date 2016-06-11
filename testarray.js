
 function ABC() {
 }

ABC.prototype.TestArray=function(){
	var arx=[];
	arx.push("1");
	arx.push("2");
	arx.push("3");
	arx.push("4");
	var l1=arx.length;
	console.log("arx.length: %s",arx.length);
	this.SendArray(arx);
	console.log("arx.length: %s",arx[2]);
}


ABC.prototype.SendArray=function(arraysend){
	console.log("------>arx.length: %s",arraysend.length);
	arraysend[2]="AAAAAA";
	arraysend=[];
	console.log("------>arx.length: %s",arraysend.length);
}
var gocdg=60;
gocdg=gocdg*3.141592653589/180;
var xc=Math.cos(gocdg);
console.log("xc: "+xc);
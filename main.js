var c = document.getElementById('canvas');
var ctx = c.getContext('2d');
var stars = [];
var speed = 0;
var int = 0;
window.addEventListener('resize', resizeCanvas, false);

resizeCanvas();
function resizeCanvas() {
	c.width = window.innerWidth-30;
	c.height = window.innerHeight-105;
}

function star(x,y,size){
	this.x = x;
  this.y = y;
  this.size = size;
  this.update = function(){
  	this.x+=speed;
    ctx.beginstoke
    ctx.fillStyle="white";
    ctx.fillRect(this.x,this.y,this.size,this.size);  
  };
}
console.log('hey')

function rand(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

setInterval(function(){
	int++;
  speed = Math.cos(int/100)+3;



	ctx.clearRect(0,0,c.width,c.height)	//clear canvas
  stars.push(new star(0,rand(0,c.height),rand(2,10))); // make a new star off the screen
  
  //update stars
  for(var i =0; i<stars.length; i++){
	stars[i].update();
  	if(stars[i].x > c.width){
  		stars.shift();
  	}
	}
  
}, 1)

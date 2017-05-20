var c = document.getElementById('canvas');
var ctx = c.getContext('2d');
var stars = [];
window.addEventListener('resize', resizeCanvas, false);


var guie ={
  starSize: 2,
  speed: 4,
  density: 1
}

window.onload = function() {
  var gui = new dat.GUI();
  gui.add(guie, 'starSize', 1,100);
  gui.add(guie, 'speed', -20, 20);
  gui.add(guie, 'density', 1,300)
  resizeCanvas();


};


function resizeCanvas() {
	c.width = window.innerWidth;
	c.height = window.innerHeight;
}

function star(x,y,size){
	this.x = x;
  this.y = y;
  this.size = size;
  this.update = function(){
  	this.x+=guie.speed;
    ctx.fillStyle="white";
    ctx.fillRect(this.x,this.y,this.size,this.size);
  };
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

setInterval(function(){



  ctx.clearRect(0,0,c.width,c.height)	//clear canvas
  for(var i = 0; i<guie.density; i++){
    stars.push(new star(0,rand(0,c.height),rand(1,guie.starSize))); // make a new star off the screen
  }

  //update stars
  for(var i =0; i<stars.length; i++){
  stars[i].update();
    if(stars[i].x > c.width){
      stars.shift();
    }
  }

}, 1)

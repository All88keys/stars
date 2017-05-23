var c = document.getElementById('canvas');
var ctx = c.getContext('2d');
var stars = [];
window.addEventListener('resize', resizeCanvas, false);
var xM = 0;
var colors = ['orange','red','white','yellow','gray'];
c.addEventListener("mousemove", function(event) { xM = event.clientX;})

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


function star(x, y, size, v,color) {
  this.speed = v;
  this.x = x;
  this.y = y;
  this.size = Math.floor(v) + 1;
  this.color =colors[rand(0,colors.length-1)];
  this.update = function() {
    this.x += v * (xM - c.width / 2) / 500;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  };
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

setInterval(function() {


  ctx.clearRect(0, 0, c.width, c.height); //clear canvas
  if(xM>c.width/2) {stars.push(new star(0, rand(0, c.height), rand(1, 4), rand(5,100)/25));}
  else if(xM<c.width/2) {stars.push(new star(c.width, rand(0, c.height), rand(1, 4), rand(5,100)/25));}// make a new star off the screen

  //update stars
  for (var i = 0; i < stars.length; i++) {
  	if(stars[i] != null){
    stars[i].update();
    if (stars[i].x > c.width || stars[i].x < 0) {
      stars[i]= null;
    }
    }
  }

}, 1)

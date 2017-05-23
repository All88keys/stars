var c = document.getElementById('canvas');
var ctx = c.getContext('2d');
var stars = [];
window.addEventListener('resize', resizeCanvas, false);
var xM = 0;
var yM = 0;
var colors = ['orange','red','white','yellow','gray'];
c.addEventListener("touchmove", function(event) { xM = event.pageX; yM =event.pageY;});
c.addEventListener("mousemove", function(event) { xM = event.pageX; yM =event.pageY;});

var guie ={
  theme: 'space',
  starSize: 2,
  speed: 4,
  density: 1
}

window.onload = function() {
  var gui = new dat.GUI();
  gui.add(guie, 'theme', ['space','ocean']);
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
    this.y += v * (yM - c.height / 2) / 500;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  };
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

setInterval(function() {

	if(guie.theme == 'ocean') {colors = ['#A7D2F4', '#80BBE8', '#5399D0','#94B8EC','#6F9CDD','#4B80CB'];}
	else {colors = ['orange','red','white','yellow','gray'];};

  ctx.clearRect(0, 0, c.width, c.height);//clear canvas
	
	for(var i = 0; i<guie.density; i++){
  		if(xM>c.width/2) {stars.push(new star(0, rand(1, c.height-1), rand(1, 4), rand(5,100)/25));}
		else if(xM<c.width/2) {stars.push(new star(c.width, rand(1, c.height-1), rand(1, 4), rand(5,100)/25));}// make a new star off the screen
 		if(yM>c.height/2) {stars.push(new star(rand(1, c.width-1), 0, rand(1, 4), rand(5,100)/25));}
		else if(yM<c.height/2) {stars.push(new star(rand(1,c.width-1), c.height, rand(1, 4), rand(5,100)/25));}
	}
  //update stars
  for (var i = 0; i < stars.length; i++) {
  	if(stars[i] != null){
    stars[i].update();
    if (stars[i].x > c.width || stars[i].x < 0 || stars[i].y > c.height || stars[i].y < 0) {
      stars[i]= null;
    }
    
    }
  }

}, 1)

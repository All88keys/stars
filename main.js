var c = document.getElementById('canvas');
var ctx = c.getContext('2d');
var stars = [];
window.addEventListener('resize', resizeCanvas, false);
var xM = 0;
var yM = 0;
var colors = ['orange','red','white','yellow','gray','green','pink','blue','purple','brown'];
var themeNames = [];
document.addEventListener("touchmove", function(event) { xM = event.pageX; yM =event.pageY;});
document.addEventListener("mousemove", function(event) { xM = event.pageX; yM =event.pageY;});
parent.document.addEventListener("touchmove", function(event) { xM = event.pageX; yM =event.pageY;});
parent.document.addEventListener("mousemove", function(event) { xM = event.pageX; yM =event.pageY;});

var themes= [
	{
		id: 'space',
		bg: 'black',
		colors: ['white'],
	},
	{
		id: 'ocean',
		bg: '#021E3D',
		colors: ['#A7D2F4', '#80BBE8', '#5399D0','#94B8EC','#6F9CDD','#4B80CB'],
	},
	{
		id: 'rainbow',
		bg: 'black',
		colors: ['orange','red','white','yellow','gray','green','pink','blue','purple','brown'],
	},
	{
		id: 'vector',
		bg: 'black',
		colors: ['red','blue','lime'],
	},
	{
		id: 'snow',
		bg: '#394044',
		colors: ['#ffffff',"#c9c9c9","#e5e5e5","#ededed"],
	}
];

function updateThemes(){
		for(var i = 0; i<themes.length; i++){
			if(guie.theme == themes[i].id){
				colors = themes[i].colors;
				document.getElementById('canvas').style.background = themes[i].bg;
			}
		}		
	}

var guie ={
  theme: 'space',
  starSize: 2,
  speed: 1,
  density: 1
}



window.onload = function() {
	for(var i = 0; i<themes.length; i++){
		themeNames.push(themes[i].id);
	};
  var gui = new dat.GUI();
  gui.add(guie, 'theme', themeNames).onChange(function(){reset()});
  gui.add(guie, 'starSize', 1,100).onChange(function(){reset()});
  gui.add(guie, 'speed', -1, 10).onChange(function(){reset()});
  gui.add(guie, 'density', 1,50).onChange(function(){reset()});
  resizeCanvas();


};


function resizeCanvas() {
	c.width = window.innerWidth;
	c.height = window.innerHeight;
}

function star(x, y, size, v,color) {
  this.velocity = v+guie.speed;
  this.x = x;
  this.y = y;
  this.size = Math.floor(v) + guie.starSize;
  this.color =colors[rand(0,colors.length)];
  this.update = function() {
    this.x += this.velocity * (xM - c.width / 2) / 500;
    this.y += this.velocity * (yM - c.height / 2) / 500;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  };
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

setInterval(function() {

	updateThemes();
	/*if(guie.theme == 'ocean') {
		colors = ['#A7D2F4', '#80BBE8', '#5399D0','#94B8EC','#6F9CDD','#4B80CB'];
		document.getElementById('canvas').style.background = '#021E3D';
	}
	else {//colors = ['orange','red','white','yellow','gray'];
		//colors = ['orange','red','white','yellow','gray','green','pink','blue','purple','brown'];
		colors = ['red','blue','#00FF00','white'];
	     document.getElementById('canvas').style.background = 'black';
	     };*/

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


function reset(){
	var max = stars.length;
	for (var i = 0; i < max; i++) {
  	stars[i] = null;
	}
}

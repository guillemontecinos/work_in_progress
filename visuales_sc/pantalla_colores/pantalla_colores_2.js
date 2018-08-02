// Color screening
// visuals for sector coordillera
// by Guillermo Montecinos
//
var deltaTono = 100/50;
var countTono = 0;
var x = 0;

var fondos = [];

function setup(){
  createCanvas(windowWidth, windowHeight);
  background(0);
  colorMode(HSB,100);
  noStroke();
}

function draw(){
  background(0);
  for (var i = 0; i < fondos.length; i++) {
    fondos[i].update();
  }
}

function newScreen(){
  fill(tono);
  rect(-rectWidth+x,0,rectWidth,rectHeight);
  x+=10;
  if(x>=rectWidth){
    disparar = !disparar;
    countTono++;
    x=0;
  }
}

function mouseClicked(){
  createScreen();
}

function createScreen(){
  //crear nuevo rect
  fondos.push(new rectScreen(width, height, deltaTono, countTono, 58, 75));
  countTono++;
  if(countTono == 51){
    countTono = 0;
  }
  console.log(countTono);
}

function rectScreen(rectWidth, rectHeight, deltaTono, countTono, sat, brig){
  this.time = 0;
  this.x = 0;
  this.y = 0;
  this.width = rectWidth;
  this.height = rectHeight;
  this.tono = color(deltaTono*countTono,sat, brig);

  this.update = function(){
    fill(this.tono);
    rect(-this.width + this.x, 0, this.width, this.height);
    this.move();
    // this.killRect
  }

  this.move = function(){
    this.time++;
    if(this.time <= 60){
        this.x = map(this.time, 0, 60, 0, this.width);
    }
  }

  // this.killRect = function(){
  //
  // }

}

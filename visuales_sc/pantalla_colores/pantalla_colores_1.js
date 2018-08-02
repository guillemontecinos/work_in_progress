// Color screening
// visuals for sector coordillera
// by Guillermo Montecinos
//
var tono;
var deltaTono = 100/100;
var countTono = 0;
var x = 0;
var disparar = false;
var rectWidth;
var rectHeight;

function setup(){
  createCanvas(windowWidth, windowHeight);
  background(0);
  colorMode(HSB,100);
  noStroke();
  rectWidth = width;
  rectHeight = height;
}

function draw(){
  //tono = color(frameCount%100,map(mouseX,0,width,0,100),map(mouseY,0,height,0,100));
  tono = color(deltaTono*countTono,48,75);
  if(disparar){
    newScreen();
  }
  console.log(disparar);
}

function newScreen(){
  fill(tono);
  rect(-rectWidth+x,0,rectWidth,rectHeight);
  x+=10;
  if(x==rectWidth){
    disparar = !disparar;
    countTono++;
    x=0;
  }
}

function mouseClicked(){
  disparar = !disparar;
}

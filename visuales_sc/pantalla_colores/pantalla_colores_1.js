// Color screening
// visuals for sector coordillera
// by Guillermo Montecinos
//
var tono;

function setup(){
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB,100);
}

function draw(){
  //tono = color(frameCount,100,map(mouseX,0,width,0,100));
  tono = color(frameCount,100,100); 
  background(tono);
}

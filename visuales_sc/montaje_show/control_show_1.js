// visuals prototype for Sector Coordillera
// by Guillermo Montecinos
// Show visuals control center
// controlling random shapes and lissajous from one script

var scene = 0;
var blackoutScene = true;
// var for instances
var mimica;
var sueno_recuerdo;

function setup(){
  createCanvas(windowWidth, windowHeight);
  mimica = new ShapesObject();
  sueno_recuerdo = new lissajousObject();
  mimica.setupShapes();
  sueno_recuerdo.setupLissajous();
  noCursor();
}

function draw(){
  if (scene == 0) {
    background(0);
  }
  else if (scene == 2) {
    sueno_recuerdo.drawLissajous();
  }
  else if (scene == 3) {
    mimica.drawSahpes();
  }
}

function keyPressed(){
  mimica.increaseShapes(key);
  sueno_recuerdo.readKeyPressed(key);
  if (key === '0') {
    scene = 0;
    blackoutScene = true;
  }
  else if (key === '2' && blackoutScene == true) {
    scene = 2;
    sueno_recuerdo.reActivateLissajous();
    blackoutScene = false;
  }
  else if (key === '3' && blackoutScene == true) {
    scene = 3;
    mimica.reActivateShapes();
    mimica.increaseShapes('q');
    blackoutScene = false;
  }
}

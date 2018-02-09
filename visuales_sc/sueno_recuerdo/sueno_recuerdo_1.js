// visuals prototype for Sector Coordillera
// by Guillermo Montecinos
// for sueño o recuerdo

var micFiltered=0;
var micAnterior=0;
var alphaGain = .3;
var scene = 1;

function setup(){
  createCanvas(windowWidth, windowHeight);
  //mic control initialization
  mic = new p5.AudioIn()
  mic.start(); //TODO: reactivate
  noCursor();
  // colorMode(HSB,1);
}

function draw(){
  if(scene == 1){
    // background(map(mouseX,0,width,0,1),map(mouseY,0,height,0,1),1);
    // fill(1-map(mouseX,0,width,0,1),map(mouseY,0,height,0,1),1);
    background(0);
    fill(255);
  }
  else if (scene == 2) {
    // background(1-map(mouseX,0,width,0,1),map(mouseY,0,height,0,1),1);
    // fill(map(mouseX,0,width,0,1),map(mouseY,0,height,0,1),1);
    background(255);
    fill(0);
  }

  rectMode(CENTER);
  noStroke();

  // rect(width/3,map(sin(millis()/500),-1,1,0,height),width/6,height);
  rect(width/3,height/2,setColorSceneB()*width/6+width/6,height);
  // rect(2*width/3,height/2,width/6,height);
  // rect(2*width/3,map(sin(millis()/500),-1,1,0,height),width/6,height);
  rect(2*width/3,map(sin(millis()/500),-1,1,0,height),-setColorSceneB()*width/6+width/6,height);
}

// setting brightness of the curve's stroke using mic
function setColorSceneB(){
  micFiltered = alphaGain*abs(mic.getLevel())+(1-alphaGain)*micAnterior;
  micAnterior = micFiltered;
  return micFiltered;
}

function keyPressed() {
  if (key == 1) {
    scene = 1;
  } else if (key == 2) {
    scene = 2;
  }
}

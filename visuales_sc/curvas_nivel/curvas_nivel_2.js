// Curvas de nivel aleatoras
// visuals for sector coordillera
// by Guillermo Montecinos
// originally developed using Processing

var puntos = [];
var numPuntos = 50;
var numLineas;
var step = 10;
//mic vars
var mic;
var alphaGain = .8;
var currentStroke = 1;

function setup(){
  createCanvas(windowWidth, windowHeight);
  //curvas parameters
  numLineas = int(height/step);
  for (var i = 0; i < numLineas; i++) {
    puntos[i] = [];
    for (var j = 0; j < numPuntos + 1; j++) {
      puntos[i][j] = createVector(0,0);
    }
  }
  //audio input objects
  mic = new p5.AudioIn();
  mic.start();
  //color setup
  colorMode(RGB);
}

function draw(){
  //background(240,.999);
  background(240);
  // background(0);
  //randomSeed(0);
  currentStroke = setStroke();
  // Update lines
  if(frameCount % 8 == 0){
    for (var i = 0; i < puntos.length; i++) {
      puntos[i][0].set(0,i*-step+random(-10,10));
      for (var j = 1; j < puntos[0].length; j++) {
        if (i == 0) {
          // puntos[i][j].set(j*width/numPuntos, puntos[i][j-1].y + int(random(-2,2))*10*noise(j));
          puntos[i][j].set(j*width/numPuntos, puntos[i][j-1].y + map(noise(j),0,1,-10,10));
        }
        else{
          puntos[i][j].set(j*width/numPuntos, (puntos[i-1][j].y-step+random(-10,10))*.5 + puntos[i][j-1].y*.5 + 10*map(noise(i*j),0,1,-1,1));
        }
      }
    }
  }
  // Draw lines
  stroke(0);
  // stroke(230);
  strokeWeight(currentStroke);
  translate(0,height);
  for(var i = 0; i < puntos.length; i++){
    for(var j = 1; j < puntos[i].length; j++){
      line(puntos[i][j-1].x, puntos[i][j-1].y, puntos[i][j].x, puntos[i][j].y);
    }
  }
}

function setStroke(){
  return alphaGain * map(this.mic.getLevel(),0,1,1.5,10) + (1-alphaGain) * currentStroke;
}

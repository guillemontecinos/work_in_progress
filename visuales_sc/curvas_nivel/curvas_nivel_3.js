// Curvas de nivel aleatoras
// visuals for sector coordillera
// by Guillermo Montecinos
// originally developed using Processing
// scenes: 0; fondo negro y una línea blanca al medio, sonido activado
// scenes: 1; fondo blanco y una línea negra al medio, sonido activado
// scenes: 2; cantidad de líneas creciente de abajo hacia arriba, sonido activado
// scenes: 3; video barti, todas la líneas, sonido activado
// scenes: 4; fondo negro y líneas blancas, sonido activado

var puntos = [];
var numPuntos = 50;
var numLineas;
var step = 10;
//mic vars
var mic;
var alphaGain = .8;
var currentStroke = 1;
//video vars
var vid;
var playVid = false;
// control vars
var scenes = 0;

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
  //video objects
  vid = createVideo("barti_boca_trim.mp4");
  vid.volume(0);
  vid.hide();
  //color setup
  colorMode(RGB);

  frameRate(40);
}

function draw(){

  console.log(scenes);

  if(scenes == 0 || scenes == 1){// scenes: 0; fondo negro y una línea blanca al medio, sonido activado

    if (scenes == 0) {
      background(0);
      stroke(255);
    }
    else if (scenes == 1) {
      background(230);
      stroke(0);
    }

    currentStroke = 4;
    // Update lines
    if(frameCount % 8 == 0){
      for (var i = 0; i < 1; i++) {
        puntos[i][0].set(0,i*-step+random(-10,10));
        for (var j = 1; j < puntos[0].length; j++) {
          if (i == 0) {
            puntos[i][j].set(j*width/numPuntos, puntos[i][j-1].y + map(noise(j),0,1,-10,10));
          }
          else{
            puntos[i][j].set(j*width/numPuntos, (puntos[i-1][j].y-step+random(-10,10))*.5 + puntos[i][j-1].y*.5 + 10*map(noise(i*j),0,1,-1,1));
          }
        }
      }
    }
    // Draw lines
    strokeWeight(currentStroke);
    push();
    translate(0,height/2);
    for(var i = 0; i < 1; i++){
      for(var j = 1; j < puntos[i].length; j++){
        line(puntos[i][j-1].x, puntos[i][j-1].y, puntos[i][j].x, puntos[i][j].y);
      }
    }
    pop();
  }
  else if (scenes == 2 || scenes == 3 || scenes == 4) {
    // scenes: 2; cantidad de líneas creciente de abajo hacia arriba, sonido activado
    // scenes: 3; video barti, todas la líneas, sonido activado
    // scenes: 4; fondo negro y líneas blancas, sonido activado
    if (scenes == 2) {
      background(230);
      stroke(0);
    }
    else if (scenes == 3) {
      // video display
      background(230);
      push();
      translate(0,height/2-vid.height*width/(2*vid.width));
      image(vid,0,0,width,vid.height*width/vid.width);
      pop();
      stroke(0);
    }
    else if (scenes == 4) {
      background(0);
      stroke(230);
    }
    currentStroke = setStroke();
    // Update lines
    if(frameCount % 8 == 0){
      for (var i = 0; i < puntos.length; i++) {
        puntos[i][0].set(0,i*-step+random(-10,10));
        for (var j = 1; j < puntos[0].length; j++) {
          if (i == 0) {
            puntos[i][j].set(j*width/numPuntos, puntos[i][j-1].y + map(noise(j),0,1,-10,10));
          }
          else{
            puntos[i][j].set(j*width/numPuntos, (puntos[i-1][j].y-step+random(-10,10))*.5 + puntos[i][j-1].y*.5 + 10*map(noise(i*j),0,1,-1,1));
          }
        }
      }
    }
    // Draw lines
    strokeWeight(currentStroke);
    translate(0,height);
    for(var i = 0; i < puntos.length; i++){
      for(var j = 1; j < puntos[i].length; j++){
        line(puntos[i][j-1].x, puntos[i][j-1].y, puntos[i][j].x, puntos[i][j].y);
      }
    }

  }

}

function setStroke(){
  return alphaGain * map(this.mic.getLevel(),0,1,1.5,10) + (1-alphaGain) * currentStroke;
}

function keyPressed(){
  if(key === '0'){
    scenes = 0;
  }
  else if(key === '1'){
    scenes = 1;
  }
  else if(key === '2'){
    scenes = 2;
  }
  else if(key === '3'){
    scenes = 3;
    vid.loop();
  }
  else if(key === '4'){
    scenes = 4;
  }
}

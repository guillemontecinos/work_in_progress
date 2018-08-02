// Curvas de nivel aleatoras
// visuals for sector coordillera
// by Guillermo Montecinos
// originally developed using Processing

var numOpciones = 100;
var puntos = [];
var numPuntos = 50;
var numLineas;
var step = 10;
var h = 0;
//mic vars
var mic;
var alphaGain = .8;
var currentStroke = 1;
//video vars
var vid;
var playVid = false;

function setup(){
  createCanvas(windowWidth, windowHeight);
  //curvas parameters
  numLineas = int(height/step);

  //creo los vectores
  for (var h = 0; h < numOpciones; h++) {
    puntos[h] = [];
    for (var i = 0; i < numLineas; i++) {
      puntos[h][i] = [];
      for (var j = 0; j < numPuntos + 1; j++) {
        puntos[h][i][j] = createVector(0,0);
      }
    }
  }

  //lleno los vectores
  for (var h = 0; h < numOpciones; h++) {
    for (var i = 0; i < puntos[h].length; i++) {
      puntos[h][i][0].set(0,i*-step+random(-10,10));
      for (var j = 1; j < puntos[h][i].length; j++) {
        if (i == 0) {
          puntos[h][i][j].set(j*width/numPuntos, puntos[h][i][j-1].y + int(random(-2,2))*10*noise(j));
        }
        else{
          puntos[h][i][j].set(j*width/numPuntos, (puntos[h][i-1][j].y-step+random(-10,10))*.5 + puntos[h][i][j-1].y*.5 + 10*map(noise(i*j),0,1,-1,1));
        }
      }
    }
  }

  //audio input objects
  mic = new p5.AudioIn();
  mic.start();
  //video objects
  // vid = createVideo("barti_boca_trim.webm");
  vid = createVideo("barti_boca.mp4");
  vid.volume(0);
  vid.hide();
  //color setup
  colorMode(RGB);

  frameRate(40);
}

function draw(){
  //background(240,.999);
  background(240);
  // background(0);

  // video display
  if(playVid){
    currentStroke = 3;
    image(vid,0,0,width,vid.height*width/vid.width);
  }

  if (frameCount%15 == 0) {
    h++;
  }

  currentStroke = setStroke();
  // Draw lines
  stroke(0);
  // stroke(230);
  strokeWeight(currentStroke);
  translate(0,height);
  for(var i = 0; i < puntos[h].length; i++){
    for(var j = 1; j < puntos[h][i].length; j++){
      line(puntos[h][i][j-1].x, puntos[h][i][j-1].y, puntos[h][i][j].x, puntos[h][i][j].y);
    }
  }
}

function setStroke(){
  return alphaGain * map(this.mic.getLevel(),0,1,1.5,10) + (1-alphaGain) * currentStroke;
}

function mouseClicked(){
  if (playVid == false) {
    playVid = true;
    vid.loop();
  }
  else {
    playVid = false;
  }
}

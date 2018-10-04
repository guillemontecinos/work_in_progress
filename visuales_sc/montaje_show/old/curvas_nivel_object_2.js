// Curvas de nivel aleatoras
// visuals for sector coordillera
// by Guillermo Montecinos
// originally developed using Processing
// scenes: 0; fondo negro y una línea blanca al medio, sonido activado
// scenes: 1; fondo blanco y una línea negra al medio, sonido activado
// scenes: 2; cantidad de líneas creciente de abajo hacia arriba, sonido activado
// scenes: 3; video barti, todas la líneas, sonido activado
// scenes: 4; fondo negro y líneas blancas, sonido activado

//=====================================================
// Curvas de Nivel Instance
//=====================================================

function CurvasNivel(){
  // variables
  // curvasNivel parameters
  this.puntos = [];
  this.numPuntos = 50;
  this.numLineas;
  this.step = 10;
  //mic vars
  this.mic;
  this.alphaGain = .95;
  this.currentStroke = 1;
  //video vars
  this.vid;
  this.playVid = false;
  // control vars
  this.scenes = 0;

  // methods
  this.setupCurvasNivel = function(){
    //curvas parameters
    this.numLineas = int(height/this.step);
    for (var i = 0; i < this.numLineas; i++) {
      this.puntos[i] = [];
      for (var j = 0; j < this.numPuntos + 1; j++) {
        this.puntos[i][j] = createVector(0,0);
      }
    }
    //audio input objects
    this.mic = new p5.AudioIn();
    this.mic.start();
    //video objects
    this.vid = createVideo("barti_boca_trim.mp4");
    this.vid.volume(0);
    this.vid.hide();
    //color setup and frameRate
    colorMode(RGB);
    frameRate(40);
  }

  this.drawCurvasNivel = function(){
    if(this.scenes == 0 || this.scenes == 1){// scenes: 0; fondo negro y una línea blanca al medio, sonido activado

      if (this.scenes == 0) {
        background(0);
        stroke(255);
      }
      else if (this.scenes == 1) {
        background(230);
        stroke(0);
      }

      this.currentStroke = this.setStroke(60);
      // Update lines
      if(frameCount % 8 == 0){
        for (var i = 0; i < 1; i++) {
          this.puntos[i][0].set(0,this.i*-this.step+random(-10,10));
          for (var j = 1; j < this.puntos[0].length; j++) {
            if (i == 0) {
              this.puntos[i][j].set(j*width/this.numPuntos, this.puntos[i][j-1].y + map(noise(j),0,1,-10,10));
            }
            else{
              this.puntos[i][j].set(j*width/this.numPuntos, (this.puntos[i-1][j].y-this.step+random(-10,10))*.5 + this.puntos[i][j-1].y*.5 + 10*map(noise(i*j),0,1,-1,1));
            }
          }
        }
      }
      // Draw lines
      strokeWeight(this.currentStroke);
      push();
      translate(0,height/2);
      for(var i = 0; i < 1; i++){
        for(var j = 1; j < this.puntos[i].length; j++){
          line(this.puntos[i][j-1].x, this.puntos[i][j-1].y, this.puntos[i][j].x, this.puntos[i][j].y);
        }
      }
      pop();
    }

    else if (this.scenes == 2 || this.scenes == 3 || this.scenes == 4) {
      // scenes: 2; cantidad de líneas creciente de abajo hacia arriba, sonido activado
      // scenes: 3; video barti, todas la líneas, sonido activado
      // scenes: 4; fondo negro y líneas blancas, sonido activado
      if (this.scenes == 2) {
        background(230);
        stroke(0);
      }
      else if (this.scenes == 3) {
        // video display
        background(230);
        push();
        translate(0,height/2-this.vid.height*width/(2*this.vid.width));
        filter(GRAY);
        image(this.vid,0,0,width,this.vid.height*width/this.vid.width);
        pop();
        stroke(0);
      }
      else if (this.scenes == 4) {
        background(0);
        stroke(230);
      }
      this.currentStroke = this.setStroke(5);
      // Update lines
      if(frameCount % 8 == 0){
        for (var i = 0; i < this.puntos.length; i++) {
          this.puntos[i][0].set(0,i*-this.step+random(-10,10));
          for (var j = 1; j < this.puntos[0].length; j++) {
            if (i == 0) {
              this.puntos[i][j].set(j*width/this.numPuntos, this.puntos[i][j-1].y + map(noise(j),0,1,-10,10));
            }
            else{
              this.puntos[i][j].set(j*width/this.numPuntos, (this.puntos[i-1][j].y-this.step+random(-10,10))*.5 + this.puntos[i][j-1].y*.5 + 10*map(noise(i*j),0,1,-1,1));
            }
          }
        }
      }
      // Draw lines
      strokeWeight(this.currentStroke);
      translate(0,height);
      for(var i = 0; i < this.puntos.length; i++){
        for(var j = 1; j < this.puntos[i].length; j++){
          line(this.puntos[i][j-1].x, this.puntos[i][j-1].y, this.puntos[i][j].x, this.puntos[i][j].y);
        }
      }

    }
  }

  this.setStroke = function(maxStroke){
    return this.alphaGain * map(this.mic.getLevel(),0,1,1.5,maxStroke) + (1-this.alphaGain) * this.currentStroke;
  }

  this.setParam = function(note, velocity){
    // note in format G1, C0, ie, note + scale
    // velocity goes from 0 to 127
    // Esta aplicación utiliza la octava #4 de abelton
    // scenes: 0 -> C4
    // scenes: 1 -> D4
    // scenes: 2 -> E4
    // scenes: 3 -> F4
    // scenes: 4 -> G4
    if (note == "C4") {
      this.scenes = 0;
    }
    else if (note == "D4") {
      this.scenes = '1';
    }
    else if (note == "E4") {
      this.scenes = '2';
    }
    else if (note == "F4") {
      this.scenes = '3';
      this.vid.loop();
    }
    else if (note == "G4") {
      this.scenes = '4';
    }
  }
}

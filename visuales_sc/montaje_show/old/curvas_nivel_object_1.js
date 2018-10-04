// Curvas de nivel aleatoras
// visuals for sector coordillera
// by Guillermo Montecinos
// originally developed using Processing

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
  // mic caption and filtering variables
  this.mic;
  this.alphaGain = .8;
  this.currentStroke = 1;

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
    //color mode
    colorMode(RGB);
  }

  this.drawCurvasNivel = function(){
    //background(240,.999);
    background(240);
    // background(0);
    //randomSeed(0);
    this.currentStroke = this.setStroke();
    // Update lines
    if(frameCount % 8 == 0){
      for (var i = 0; i < this.puntos.length; i++) {
        this.puntos[i][0].set(0,i*-this.step+random(-10,10));
        for (var j = 1; j < this.puntos[0].length; j++) {
          if (i == 0) {
            this.puntos[i][j].set(j*width/this.numPuntos, this.puntos[i][j-1].y + int(random(-2,2))*10*noise(j));
          }
          else{
            this.puntos[i][j].set(j*width/this.numPuntos, (this.puntos[i-1][j].y-this.step+random(-10,10))*.5 + this.puntos[i][j-1].y*.5 + 10*map(noise(i*j),0,1,-1,1));
          }
        }
      }
    }
    // Draw lines
    stroke(0);
    // stroke(230);
    strokeWeight(this.currentStroke);
    translate(0,height);
    for(var i = 0; i < this.puntos.length; i++){
      for(var j = 1; j < this.puntos[i].length; j++){
        line(this.puntos[i][j-1].x, this.puntos[i][j-1].y, this.puntos[i][j].x, this.puntos[i][j].y);
      }
    }
  }

  this.setStroke = function(){
    return this.alphaGain * map(this.mic.getLevel(),0,1,1.5,10) + (1-this.alphaGain) * this.currentStroke;
  }
}

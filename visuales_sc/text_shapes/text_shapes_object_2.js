// Text to shapes manipulation
// visuals for sector coordillera
// by Guillermo Montecinos

var texto;

function preload(){
  font = loadFont('./assets/helvetica.otf');
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  texto = new textObject(font);
  texto.setupText();
}

function draw(){
  texto.drawText();
}

function textObject(font){
  // variables
  this.font = font;
  this.string = ['sector','coordillera'];
  this.box = [];
  this.tamanoTexto = 200;
  this.puntos = [];
  this.rad;
  this.a = 5;
  this.b = 7;
  this.sizeMult = [1.7,1];
  this.sqMult = [1.15,.8];
  // animation
  this.triggered = false;

  // methods
  this.setupText = function(){
    for (var i = 0; i < this.string.length; i++) {
      textSize(this.tamanoTexto*this.sizeMult[i]);
      this.box[i] = this.font.textBounds(this.string[i]);
      this.puntos[i] = this.font.textToPoints(this.string[i], 0, 0, this.tamanoTexto*this.sizeMult[i], {
        sampleFactor: .3,
        simplifyThreshold: 0
      });
    }
    rectMode(CENTER);
  }

  this.drawText = function(){
    randomSeed(100);
    background(0,0,0,10);
    translate(width/2,height/2);
    // ellipse(0,0,100,100);
    // noFill();
    // stroke(255);
    // rectMode(CENTER);
    // rect(0,0,box1.w,box1.h);
    noStroke();
    fill(255,255,255,100);
    for (var j = 0; j < this.string.length; j++) {
      this.rad = map(350*this.sqMult[j], 0, width, 0, 50);
      for (var i = 0; i < this.puntos[j].length; i++) {
        push();
        if (j == 0) {
          var vAux = createVector(this.puntos[j][i].x-this.box[j].w/2,this.puntos[j][i].y-this.box[j].h/2+this.box[j+1].h/2);
        }
        else {
          var vAux = createVector(this.puntos[j][i].x-this.box[j].w/2,this.puntos[j][i].y+this.box[j].h);
        }
          // vAux.mult(this.expRamp(150,250,.5));
          translate(vAux.x, vAux.y);
          push();
            rotate(PI/4);
            rect(random(1,this.rad) * cos(random(this.a) * millis()/631 + i * PI/3),random(1,this.rad) * sin(random(this.b) * millis()/631 + i * PI/3),this.rad*.9,this.rad*.9);
          pop();
        pop();
      }
    }
  }

  this.reActivateText = function(){
    colorMode(RGB);
  }
}

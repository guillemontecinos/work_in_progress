// Text to shapes manipulation
// visuals for sector coordillera
// by Guillermo Montecinos
//
// var font;
// var textShape;
// function preload(){
//   font = loadFont('./assets/helvetica.otf');
// }
//
// function setup(){
//   createCanvas(windowWidth,windowHeight);
//   textShape = new textObject(font);
//   textShape.setupText();
//   noCursor();
// }
//
// function draw(){
//   textShape.drawText();
// }

function textObject(font){
  // variables
  this.font = font;
  this.string = 'SECTORCOORDILLERA';
  // this.string = 'SectorCoordillera';
  this.box;
  this.tamanoTexto = 60;
  this.puntos;
  this.rad;
  this.a = 7;
  this.b = 9;

  // methods
  this.setupText = function(){
    textSize(this.tamanoTexto);
    this.box = this.font.textBounds(this.string);
    this.puntos = this.font.textToPoints(this.string, 0, 0, this.tamanoTexto, {
      sampleFactor: .3,
      simplifyThreshold: 0
    });
    colorMode(RGB);
  }

  this.drawText = function(){
    this.rad = map(60, 0, width, 0, 50);
    randomSeed(100);
    // background(0,10);
    background(0,20);
    translate(width/2,height/2);
    push();
      noStroke();
      // fill(255,100);
      fill(255,100);
      translate(-this.box.w/2,this.box.h/2);
      for (var i = 0; i < this.puntos.length; i++) {
        push();
          translate(this.puntos[i].x, this.puntos[i].y);
          // ellipse(random(1,this.rad) * cos(random(this.a) * millis()/631 + i * PI/3), random(1,this.rad) * sin(random(this.b) * millis()/631 + i * PI/3),this.rad,this.rad);
          push();
            rotate(PI/4);
            rect(random(1,this.rad) * cos(random(this.a) * millis()/631 + i * PI/3), random(1,this.rad) * sin(random(this.b) * millis()/631 + i * PI/3),this.rad,this.rad);
          pop();
        pop();
      }
    pop();
  }

  this.reActivateText = function(){
    colorMode(RGB);
  }
}

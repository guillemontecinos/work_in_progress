// Random shapes algorithm
// visuals for sector coordillera
// by Guillermo Montecinos

var points = [];
var minRad = 100;
var maxRad = 200;
var radLiss = 10;
var a = 7;
var b = 5;
var shape;

function setup(){
  createCanvas(windowWidth,windowHeight);
  shape = new Shape(minRad, maxRad, radLiss, a, b);
  shape.setShape();
  // colorMode(HSB);
}

function draw(){
  randomSeed(100);
  background(255);
  shape.update();
}

function Shape(minRad, maxRad, radLiss, a, b){
  this.points = [];
  this.minRad = minRad;
  this.maxRad = maxRad;
  this.radLiss = radLiss;
  this.a = a;
  this.b = b;
  this.pos = createVector(random(width), random(height));
  this.vel = createVector(random(-1,1),random(-1,1));

  this.setShape = function(){
    for (var i = 0; i < 4; i++) {
      this.points[i] = p5.Vector.fromAngle(random(i * PI/2, (i+1) * PI/2));
      this.points[i].setMag(random(minRad, maxRad));
    }
  }

  this.update = function(){
    this.updatePos();
    noStroke();
    fill(0,100);
    translate(this.pos.x, this.pos.y);
    beginShape();
    for (var i = 0; i < this.points.length; i++) {
      push();
      vertex(this.points[i].x + random(2,this.radLiss) * cos(random(1,this.a) * millis()/3000 + i * PI/2),this.points[i].y + random(2,this.radLiss) * sin(random(1,this.b) * millis()/3000 + i * PI/2));
      pop();
    }
    endShape(CLOSE);
  }

  this.updatePos = function(){
    this.pos.add(this.vel);
  }
}

// global functions
function keyPressed(){
  if (key == 'n' || key == 'N') {

  }
}

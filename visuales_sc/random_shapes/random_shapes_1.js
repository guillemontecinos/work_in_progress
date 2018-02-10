// Random shapes algorithm
// visuals for sector coordillera
// by Guillermo Montecinos

var points = [];
var minRad = 100;
var maxRad = 200;
var radLiss = 10;
var a = 7;
var b = 5;

function setup(){
  createCanvas(windowWidth,windowHeight);
  for (var i = 0; i < 4; i++) {
    points[i] = p5.Vector.fromAngle(random(i * PI/2, (i+1) * PI/2));
    points[i].setMag(random(minRad, maxRad));
  }
}

function draw(){
  randomSeed(100);
  background(255);
  translate(width/2, height/2);
  stroke(0);
  fill(0);
  beginShape();
  for (var i = 0; i < points.length; i++) {
    push();
    // translate(radLiss * cos(a * millis()/1000 + i * PI/2), radLiss * sin(b * millis()/1000 + i * PI/2));
    // vertex(points[i].x,points[i].y);
    vertex(points[i].x + random(2,radLiss) * cos(random(1,a) * millis()/3000 + i * PI/2),points[i].y + random(2,radLiss) * sin(random(1,b) * millis()/3000 + i * PI/2));
    pop();
  }
  endShape(CLOSE);
}

var punto;
var rad = 300;
var a = 1;
var b = 1;
var tailLengh = 15;
var tail = [];
var aux = [];
var backAlpha = .1; //TODO: can be controlled from an external platform

function setup(){
  createCanvas(windowWidth, windowHeight);
  for (var i = 0; i < tailLengh; i++) {
    tail[i] = createVector(rad,0); //intialize in x = rad
    aux[i] = createVector(rad,0); //intialize in x = rad
  }
  // frameRate(40);
  // color model
  colorMode(HSB,1);
  // no cursor
  noCursor();
}

function draw(){
  // environment
  background('rgba(0,0,0,'+backAlpha+')');
  // update tail
  updateTail();
  // writeLissajous parameters
  writeLissajous();
  // draw radious
  // stroke(255);
  // strokeWeight(1);
  // line(0,0,tail[0].x, tail[0].y);
  // log
  console.log("a: " + a);
  console.log("b: " + b);
}

function updateTail(){
  push();
  // lissajous parameters. integers are modified in keyPressed()
  // positions
  translate(width/2,height/2);
  // shift
  for (var i = 0; i < tail.length; i++) {
    aux[i] = tail[i].copy();
  }
  tail[0].x = rad*cos(a*millis()/800);
  tail[0].y = rad*sin(b*millis()/800);
  for (var i = 0; i < tail.length-1; i++) {
    tail[i+1] = aux[i].copy();
  }
  // drawing dots
  strokeWeight(5);
  // color setting
  stroke(mouseX/width,mouseY/height,1);
  for (var i = 0; i < tail.length-1; i++) {
    line(tail[i].x, tail[i].y, tail[i+1].x, tail[i+1].y);
    // curve(tail[i].x, tail[i].y, tail[i+1].x, tail[i+1].y);
    // arc(tail[i].x, tail[i].y, tail[i+1].x, tail[i+1].y,HALF_PI);
  }
  pop();
}

function writeLissajous(){
  textSize(20);
  text('a: ' + a, 10, height - 60);
  fill(255);
  text('b: ' + b, 10, height - 40);
  fill(255);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    a++;
  } else if (keyCode === DOWN_ARROW) {
    a--;
  }
  else if (keyCode === LEFT_ARROW) {
    b--;
  } else if (keyCode === RIGHT_ARROW) {
    b++;
  }
}

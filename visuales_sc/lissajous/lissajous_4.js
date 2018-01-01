var rad = 300;
var a = 1;
var b = 1;
var tailLengh = 15; //can be controlled externally
var alpha;
var tail = [];
var aux = [];
var backAlpha = .05; //TODO: can be controlled from an external platform
var mode = 1; //1: lissajous almost continuous mode; 2: weird lissajous

function setup(){
  alpha = HALF_PI/tailLengh;
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
  if (mode == 1) {
    tail[0].x = rad*cos(a*millis()/800);
    tail[0].y = rad*sin(b*millis()/800);
  }
  else if (mode == 2) {
    tail[0].x = rad*cos(a*frameCount*alpha);
    tail[0].y = rad*sin(b*frameCount*alpha);
  }
  for (var i = 0; i < tail.length-1; i++) {
    tail[i+1] = aux[i].copy();
  }
  // drawing dots
  strokeWeight(5);
  // color setting
  // stroke(mouseX/width,mouseY/height,1);
  // stroke(map(sin(millis()/1000),-1,1,0,1),mouseY/height,1);
  stroke(0,0,map(sin(millis()/1000),-1,1,0,1));
  for (var i = 0; i < tail.length-1; i++) {
    line(tail[i].x, tail[i].y, tail[i+1].x, tail[i+1].y);
    // curve(0, 0, tail[i].x, tail[i].y, tail[i+1].x, tail[i+1].y, 0, 0);
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
  text('mode: ' + mode, 10, height - 20);
  fill(255);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    a++;
  }
  else if (keyCode === DOWN_ARROW) {
    a--;
  }
  else if (keyCode === LEFT_ARROW) {
    b--;
  }
  else if (keyCode === RIGHT_ARROW) {
    b++;
  }
  else if (key === '1') {
  mode = 1;
  }
  else if (key === '2') {
  mode = 2;
  }
}

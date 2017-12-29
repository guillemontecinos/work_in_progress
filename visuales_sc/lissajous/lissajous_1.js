var punto;
var rad = 200;
var a = 1;
var b = 1;
var tail = [];
var aux = [];

function setup(){
  createCanvas(windowWidth, windowHeight);
  // punto = createVector(0,0);
  for (var i = 0; i < 10; i++) {
    tail[i] = createVector(0,0);
    aux[i] = createVector(0,0);
  }
  // frameRate(40);
  // color model
  colorMode(HSB,1);
}

function draw(){
  // environment
  background(0,80);
  // update tail
  updateTail();
  // draw drawTail
  drawTail();
  // log
  console.log("a: " + a);
  console.log("b: " + b);
}

function updateTail(){
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
}

function drawTail(){
  // drawing dots
  strokeWeight(4);
  // color setting
  stroke(mouseX/width,mouseY/height,1);
  for (var i = 0; i < tail.length-1; i++) {
    // point(tail[i].x,tail[i].y);
    line(tail[i].x, tail[i].y, tail[i+1].x, tail[i+1].y);
  }
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

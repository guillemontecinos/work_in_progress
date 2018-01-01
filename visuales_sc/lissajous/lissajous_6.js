// visuals prototype for Sector Coordillera
// by Guillermo Montecinos
// inspiredin Lissajous functions
// four scenes:
// A: curve's color is controlled by the mouse
// B: curve's color is controlled by the microfone
// C: curve's color changes automated with a sin function
// D: curve's color is controlled by 'X', and responses like a drum kick

// Lissajous curve parameters
var rad = 300;
var a = 1;
var b = 1;
var tailLengh = 15; //can be controlled externally
var alpha;
var tail = [];
var aux = [];
// environment parameters
var backAlpha = .05; //TODO: can be controlled from an external platform
var mode = 1; //1: lissajous almost continuous mode; 2: weird lissajous
var scene = 'A'; //controlled with the keyboard using letter S (sound)
// mic caption and filtering variables
var mic; // mic object for mic control
var micAnterior = 0;
var micFiltered = 0;
var alphaGain = 0.4; //TODO: reactivate
// MIDI triggering
var triggered = false;
var startTime = 0;

function setup(){
  alpha = HALF_PI/tailLengh;
  createCanvas(windowWidth, windowHeight);
  //mic control initialization
  mic = new p5.AudioIn()
  mic.start(); //TODO: reactivate
  // tail vectors initialization
  for (var i = 0; i < tailLengh; i++) {
    tail[i] = createVector(rad,0); //intialize in x = rad
    aux[i] = createVector(rad,0); //intialize in x = rad
  }
  // color model
  colorMode(HSB,1);
  // no cursor
  noCursor();
}

function draw(){
  // environment
  background('rgba(0,0,0,'+backAlpha+')');
  backAlpha = .05;
  // update tail
  updateTail();
  // writeLissajous parameters
  writeLissajous();
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
  // color setting, three scenes
  if (scene == 'A') { // A: curve's color is controlled by the mouse
    stroke(mouseX/width,mouseY/height,1);
  }
  else if(scene == 'B') { // B: curve's color is controlled by the microfone
    stroke(0,0,setColorSceneB());
  }
  else if(scene == 'C') { // C: curve's color changes automated with a sin function
    stroke(map(sin(millis()/1000),-1,1,0,1),mouseY/height,1);
  }
  else if(scene == 'D') { // D: curve's color is controlled by space bar, and responses like a drum kick
    backAlpha = .2;
    stroke(mouseX/width,expRamp(80,100,1),1);
  }
  else if(scene == 'Q') { // Q: No visualization
    // TODO: make a scene with no visualization
    backAlpha = 1;
  }
  // lines drawing
  for (var i = 0; i < tail.length-1; i++) {
    line(tail[i].x, tail[i].y, tail[i+1].x, tail[i+1].y);
    // TODO: improve the resolution of the curve
    // curve(0, 0, tail[i].x, tail[i].y, tail[i+1].x, tail[i+1].y, 0, 0);
    // arc(tail[i].x, tail[i].y, tail[i+1].x, tail[i+1].y,HALF_PI);
  }
  pop();
}

// setting brightness of the curve's stroke using mic
function setColorSceneB(){
  micFiltered = alphaGain*abs(mic.getLevel())+(1-alphaGain)*micAnterior;
  micAnterior = micFiltered;
  return micFiltered;
}

// exponential ramp to trigger kicks
function expRamp(timeUp, timeDown, A){
  if(triggered == true){
  	var x = 0;
  	if (millis() - startTime <= timeUp) {
  		x = A*(exp(map(millis(), 0, timeUp, 0, 0.71)) - 1);
  	}
  	else if (millis() - startTime > timeUp && millis() - startTime <= timeUp + timeDown) {
  		x = A - A*(millis() - startTime)/(timeUp+timeDown);
  	}
  	else if(millis() - startTime > timeUp + timeDown){
  		x = 0;
      triggered = false;
  	}
  	return x;
  }
}

function writeLissajous(){
  textSize(20);
  text('a: ' + a, 10, height - 80);
  fill(255);
  text('b: ' + b, 10, height - 60);
  fill(255);
  text('mode: ' + mode, 10, height - 40);
  fill(255);
  text('scene: ' + scene, 10, height - 20);
  fill(255);
}

function keyPressed() {
  // lissajous parameters control
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
  // lissajous model control
  else if (key === '1') {
  mode = 1;
  }
  else if (key === '2') {
  mode = 2;
  }
  // scene control
  else if (key === 'A' || key === 'a') {
    scene = 'A';
  }
  else if (key === 'B' || key === 'b') {
    scene = 'B';
  }
  else if (key === 'C' || key === 'c') {
    scene = 'C';
  }
  else if (key === 'D' || key === 'd') {
    scene = 'D';
  }
  else if (key === 'Q' || key === 'q') {
    scene = 'Q';
  }
  else if (key === 'X' || key === 'x') { //triggers kick
    triggered = true;
    startTime = millis();
  }
}

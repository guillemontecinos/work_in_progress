// Text to shapes manipulation
// visuals for sector coordillera
// by Guillermo Montecinos
// designed for 2 strings array

var font;
var string = ['sector','coordillera'];
var box = [];
var tamanoTexto = 200;
var puntos = [];
var rad;
var a = 5;
var b = 7;
var sizeMult = [1.7,1];
var sqMult = [1.15,.8];
// animation
var triggered = false;

function preload(){
  font = loadFont('./assets/calibri.otf');
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  background(0);
  for (var i = 0; i < string.length; i++) {
    textSize(tamanoTexto*sizeMult[i]);
    box[i] = font.textBounds(string[i]);
    puntos[i] = font.textToPoints(string[i], 0, 0, tamanoTexto*sizeMult[i], {
      sampleFactor: .3,
      simplifyThreshold: 0
    });
  }
  noCursor();
  rectMode(CENTER);
  colorMode(HSB,1);
}

function draw(){
  // console.log(mouseX);
  // console.log(mouseY);

  randomSeed(100);
  // background(0,0,0,10);
  background('rgba(0,0,0,10)');
  translate(width/2,height/2);
  // ellipse(0,0,100,100);
  // noFill();
  // stroke(255);
  // rectMode(CENTER);
  // rect(0,0,box1.w,box1.h);
  noStroke();
  // fill(255,255,255,100);
  fill(map(sin(millis()/1500),-1,1,0,1),mouseY/height,1);
  for (var j = 0; j < string.length; j++) {
    rad = map(350*sqMult[j], 0, width, 0, 50);
    for (var i = 0; i < puntos[j].length; i++) {
      push();
      if (j == 0) {
        var vAux = createVector(puntos[j][i].x-box[j].w/2,puntos[j][i].y-box[j].h/2+box[j+1].h/2);
      }
      else {
        var vAux = createVector(puntos[j][i].x-box[j].w/2,puntos[j][i].y+box[j].h);
      }
        vAux.mult(expRamp(150,250,.5));
        translate(vAux.x, vAux.y);
        push();
          rotate(PI/4);
          rect(random(1,rad) * cos(random(a) * millis()/631 + i * PI/3),random(1,rad) * sin(random(b) * millis()/631 + i * PI/3),rad*.9,rad*.9);
        pop();
      pop();
    }
  }
}

function expRamp(timeUp, timeDown, A){
  if(triggered == true){
  	var x = 0;
  	if (millis() - startTime <= timeUp) {
  		x = 1 + A * (exp(map(millis() - startTime, 0, timeUp, 0, 0.71)) - 1);
  	}
  	else if (millis() - startTime > timeUp && millis() - startTime <= timeUp + timeDown) {
  		x = 1 + A - A * (millis() - startTime)/(timeUp+timeDown);
  	}
  	else if(millis() - startTime > timeUp + timeDown){
  		x = 1;
      triggered = false;
  	}
    // console.log(x);
  	return x;
  }
  else {
    return 1;
  }
}

function triggerKick(A){
  gain = A;
  triggered = true;
  startTime = millis();
}

function keyPressed() {
  if (key === 'X' || key === 'x') { //triggers kick
    triggerKick(1);
  }
}

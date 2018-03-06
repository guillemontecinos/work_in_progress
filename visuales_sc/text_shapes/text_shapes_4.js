// Text to shapes manipulation
// visuals for sector coordillera
// by Guillermo Montecinos

var font;
var string = 'sector';
var box;
var tamanoTexto = 200;
var puntos;
var rad = 15;
var a = 5;
var b = 7;
// animation
var triggered = false;

function preload(){
  font = loadFont('./assets/courier.otf');
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  background(0);
  textSize(tamanoTexto);
  box = font.textBounds(string);
  puntos = font.textToPoints(string, 0, 0, tamanoTexto, {
    sampleFactor: .3,
    simplifyThreshold: 0
  });
  noCursor();
}

function draw(){
  console.log(mouseX);
  console.log(mouseY);
  rad = map(350, 0, width, 0, 50);
  randomSeed(100);
  background(0,0,0,10);
  translate(width/2,height/2);
  noStroke();
  fill(255,255,255,100);
  for (var i = 0; i < puntos.length; i++) {
    push();
      var vAux = createVector(puntos[i].x-box.w/2,puntos[i].y+box.h/2);
      vAux.mult(expRamp(150,250,.5));
      translate(vAux.x, vAux.y);
      // ellipse(random(1,rad) * cos(random(a) * millis()/631 + i * PI/3),random(1,rad) * sin(random(b) * millis()/631 + i * PI/3),rad*.9,rad*.9);
      rect(random(1,rad) * cos(random(a) * millis()/631 + i * PI/3),random(1,rad) * sin(random(b) * millis()/631 + i * PI/3),rad*.9,rad*.9);
    pop();
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

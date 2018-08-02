// Curvas de nivel aleatoras
// visuals for sector coordillera
// by Guillermo Montecinos
// originally developed using Processing

var puntos = [];
var numPuntos = 50;
var numLineas;
var step = 10;

function setup(){
  createCanvas(windowWidth, windowHeight);
  numLineas = int(height/step);
  for (var i = 0; i < numLineas; i++) {
    puntos[i] = [];
    for (var j = 0; j < numPuntos + 1; j++) {
      puntos[i][j] = createVector(0,0);
    }
  }
}

function draw(){
  background(255);
  randomSeed(0);
  for (var i = 0; i < puntos.length; i++) {
    puntos[i][0].set(0,i*-step+random(-10,10));
    for (var j = 1; j < puntos[0].length; j++) {
      if (i == 0) {
        puntos[i][j].set(j*width/numPuntos, puntos[i][j-1].y + int(random(-2,2))*10*noise(j));
      }
      else{
        puntos[i][j].set(j*width/numPuntos, (puntos[i-1][j].y-step+random(-10,10))*.5 + puntos[i][j-1].y*.5 + 10*map(noise(i*j),0,1,-1,1));
      }
    }
  }

  stroke(0);
  strokeWeight(1);
  translate(0,height);
  for(var i = 0; i < puntos.length; i++){
    for(var j = 1; j < puntos[i].length; j++){
      line(puntos[i][j-1].x, puntos[i][j-1].y, puntos[i][j].x, puntos[i][j].y);
    }
  }
}

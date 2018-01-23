// visuals for Sector Coordillera
// cordillera simulation
// by Guillermo Montecinos

// var cerro;
var cordillera = [];
var numCerros = 2;
var selector = 1;

function setup(){
  createCanvas(windowWidth, windowHeight);
  for (var i = 0; i < numCerros; i++) {
    cordillera[i] = new Cerro(0, 0, 0, i + 1);
  }
  // cerro = new Cerro(200, 100, 10, 1);
}

function draw(){
  background(0);
  for (var i = 0; i < cordillera.length; i++) {
    cordillera[i].update();
  }
  // cerro.update();
}

// constructor of cerro
function Cerro(Bas, Heig, Exc, iD){
  this.e = Exc;
  this.b = Bas;
  this.h = Heig;
  this.posAx = 0;
  this.id = iD;

  this.update = function(){
    if (this.id == selector) {
      this.setParam();
    }
    stroke(255);
    translate(this.posAx, height);
    triangle(0, 0, this.b, 0, this.b/2 + this.e, -this.h);
    // console.log('a(' + this.posAx + ', ' + height + ')');
    // console.log('h(' + this.posAx + this.b + ', ' + height + ')');
    console.log('e(' + this.posAx + this.b/2 + this.e + ', ' + height - this.h + ')');
  }

  this.setParam = function(){
    if (this.id == selector) {
      this.b = mouseX;
      this.h = height - mouseY;
    }
    // console.log('b(' + this.id + '): ' + this.b);
    // console.log('h(' + this.id + '): ' + this.h);
    // console.log('e(' + this.id + '): ' + this.e);
  }

  this.setE = function(deltaE){
    if(this.id == selector) {
      this.e += deltaE;
    }
  }

  this.setPosAx = function(posX){
    if(this.id == selector) {
      this.posAx = posX;
    }
  }
}

function keyPressed(){
  if (keyCode === LEFT_ARROW) {
    for (var i = 0; i < cordillera.length; i++) {
      cordillera[i].setE(-1);
    }
    // cerro.setE(-1);
  }
  else if (keyCode === RIGHT_ARROW) {
    for (var i = 0; i < cordillera.length; i++) {
      cordillera[i].setE(+1);
    }
    // cerro.setE(+1);
  }
  else if (key == '0') {
    selector = 0;
  }
  else if (key == '1') {
    selector = 1;
  }
  else if (key == '2') {
    selector = 2;
  }
  else if (key == '3') {
    selector = 3;
  }
}

function mouseDragged(){
  for (var i = 0; i < cordillera.length; i++) {
    cordillera[i].setPosAx(mouseX);
  }
  // cerro.setPosAx(mouseX);
}

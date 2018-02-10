// Random Formas algorithm
// visuals for sector coordillera
// by Guillermo Montecinos

var points = [];
var minRad = 100;
var maxRad = 200;
var radLiss = 10;
var a = 7;
var b = 5;
var formas = [];

function setup(){
  createCanvas(windowWidth, windowHeight);
  // colorMode(HSL,1,1,1,1);
  formas[0] = new Forma(minRad, maxRad, radLiss, a, b);
  formas[0].setForma();
  noCursor();
}

function draw(){
  randomSeed(100);
  // background(255);
  background(0);
  for (var i = 0; i < formas.length; i++) {
    formas[i].update();
  }
}

function Forma(minRad, maxRad, radLiss, a, b){
  this.points = [];
  this.minRad = minRad;
  this.maxRad = maxRad;
  this.radLiss = radLiss;
  this.a = a;
  this.b = b;
  this.pos = createVector(random(width), random(height));
  this.vel = createVector(random(-.5,.5),random(-.5,.5));
  this.acc = .95;
  // this.color = color(random(1),random(1),random(1),.4);

  this.setForma = function(){
    for (var i = 0; i < 4; i++) {
      this.points[i] = p5.Vector.fromAngle(random(i * PI/2, (i+1) * PI/2));
      this.points[i].setMag(random(this.minRad, this.maxRad));
    }
  }

  this.update = function(){
    this.updatePos();
    noStroke();
    // fill(0,100);
    fill(255,100);
    // fill(this.color);
    push();
    translate(this.pos.x, this.pos.y);
    beginShape();
    for (var i = 0; i < this.points.length; i++) {
      vertex(this.points[i].x + random(2,this.radLiss) * cos(random(1,this.a) * millis()/3000 + i * PI/2),this.points[i].y + random(2,this.radLiss) * sin(random(1,this.b) * millis()/3000 + i * PI/2));
    }
    endShape(CLOSE);
    pop();
  }

  this.updatePos = function(){
    this.vel.mult(this.acc);
    this.pos.add(this.vel);
    if (this.pos.x <= 0) {
      this.pos.x = width;
    }
    else if (this.pos.x >= width) {
      this.pos.x = 0;
    }
    else if (this.pos.y <= 0) {
      this.pos.y = height;
    }
    else if (this.pos.y >= height) {
      this.pos.y = 0;
    }
  }
}

// global functions
function keyPressed(){
  if (key == 'n' || key == 'N') {
    formas.push(new Forma(minRad, maxRad, radLiss, a, b));
    formas[formas.length-1].setForma();
  }
  else if (key == 'q' || key == 'Q') {
    formas = [];
  }
}

//=====================================================
//MIDI mesajes recaption function
//=====================================================

//Función receptora de mensajes MIDI usando webMidi.js
WebMidi.enable(function (err) {
  if (err) {
    console.log("WebMidi could not be enabled.", err);
  }
  // Viewing available inputs and outputs
  console.log(WebMidi.inputs);
  console.log(WebMidi.outputs);
  // Display the current time
  console.log(WebMidi.time);
  // Retrieve an input by name, id or index
  var input = WebMidi.getInputByName("auxVirtualPort Bus 1");

  input = WebMidi.inputs[0];

  // Listen for a 'note on' message on all channels
  input.addListener('noteon', "all",
    function (e) {
      if (e.note.name + e.note.octave == "C1") { //message reception
        console.log("C0 received");
        console.log("velocity: " + e.velocity);
        formas.push(new Forma(minRad, maxRad, radLiss, a, b));
        formas[formas.length-1].setForma();
      }
    }
  );
});

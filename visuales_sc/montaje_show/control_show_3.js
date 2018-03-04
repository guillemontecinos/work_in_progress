// visuals prototype for Sector Coordillera
// by Guillermo Montecinos
// Show visuals control center
// controlling random shapes and lissajous from one script
// scene variable defines which visual is presented
// 0: rest 'text-like' visual
// 1: Visual for Sayén
// 2: Sueño o Recuerdo Lissajous visuals
// 3: Mimica Random Shapes Visuals

var scene = 0;
var blackoutScene = true;
var font;
// var for instances
var coordillera;
var mimica;
var sueno_recuerdo;


function preload(){
  font = loadFont('./assets/helvetica.otf');
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  coordillera = new textObject(font);
  mimica = new ShapesObject();
  sueno_recuerdo = new lissajousObject();
  coordillera.setupText();
  mimica.setupShapes();
  sueno_recuerdo.setupLissajous();
  noCursor();
}

function draw(){
  if (scene == 0) {
    // background(0);
    coordillera.drawText();
  }
  else if (scene == 2) {
    sueno_recuerdo.drawLissajous();
  }
  else if (scene == 3) {
    mimica.drawSahpes();
  }
}

function keyPressed(){
  mimica.increaseShapes(key);
  sueno_recuerdo.readKeyPressed(key);
  if (key === '0') {
    scene = 0;
    blackoutScene = true;
    coordillera.reActivateText();
  }
  else if (key === '2' && blackoutScene == true) {
    scene = 2;
    blackoutScene = false;
    sueno_recuerdo.reActivateLissajous();
  }
  else if (key === '3' && blackoutScene == true) {
    scene = 3;
    blackoutScene = false;
    mimica.reActivateShapes();
    mimica.increaseShapes('q');
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
  // En Ableton Live las notas midi están
  input.addListener('noteon', "all",
    function (e) {
      // scene controlling
      if (e.note.name + parseInt(e.note.octave+2) == "C0") {
        console.log("C0 received");
        scene = 0;
        blackoutScene = true;
        coordillera.reActivateText();
      }
      else if (e.note.name + parseInt(e.note.octave+2) == "D0") {
        console.log("D0 received");
      }
      else if (e.note.name + parseInt(e.note.octave+2) == "E0") {
        console.log("E0 received");
        scene = 2;
        blackoutScene = false;
        sueno_recuerdo.reActivateLissajous();
      }
      else if (e.note.name + parseInt(e.note.octave+2) == "F0") {
        console.log("F0 received");
        scene = 3;
        blackoutScene = false;
        mimica.reActivateShapes();
        mimica.increaseShapes('q');
      }
      // scene specific functionality
      else if (e.note.name + parseInt(e.note.octave+2) == "C3") {
        console.log("C3 received");
        mimica.increaseShapes('N');
      }
      // lissajous specific functionality controlling
      lissajous.setParam(e.note.name + e.note.octave,e.velocity);
    }
  );
});

// visuals prototype for Sector Coordillera
// by Guillermo Montecinos
// Show visuals control center
// controlling random shapes and lissajous from one script
// scene variable defines which visual is presented
// MIDI messages are managed to fit Ableton Live's nomenclature
// 0: rest 'text-like' visual (midi C0)
// 1: Visual for Sayén (midi D0)
// 2: Sueño o Recuerdo Lissajous visuals (midi E0)
// 3: Mimica Random Shapes Visuals (midi F0)
// 4: Curvas de Nivel Visuals (midi G0)
// Usa los siguientes scripts:
// lissajous_object_3.js
// random_shapes_object_2.js
// text_shapes_object_1.js
// curvas_nivel_object_3.js

var scene = 0;
var blackoutScene = true;
var font;
// var for instances
var coordillera;
var mimica;
var sueno_recuerdo;
var curvasNivel;


function preload(){
  font = loadFont('./assets/helvetica.otf');
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  coordillera = new textObject(font);
  mimica = new ShapesObject();
  sueno_recuerdo = new lissajousObject();
  curvasNivel = new CurvasNivel();
  mimica.setupShapes();
  sueno_recuerdo.setupLissajous();
  coordillera.setupText();
  curvasNivel.setupCurvasNivel();
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
  else if (scene == 4) {
    curvasNivel.drawCurvasNivel();
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
  else if (key === '4' && blackoutScene == true){
    scene = 4;
    blackoutScene = false;
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
      // console.log("Recibido: " + e.note.name + parseInt(e.note.octave+2));
      // scene controlling
      if (e.note.name + parseInt(e.note.octave+2) == "C0") {
        console.log("C0 received");
        scene = 0;
        blackoutScene = true;
        coordillera.reActivateText();
        curvasNivel.resetCurvas();
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
      else if (e.note.name + parseInt(e.note.octave+2) == "G0") {
        console.log("F0 received");
        scene = 4;
        blackoutScene = false;
      }
      // scene specific functionality
      // lissajous specific functionality controlling
      sueno_recuerdo.setParam(e.note.name + parseInt(e.note.octave+2),e.velocity);
      // Mimica specific functionality
      if (e.note.name + parseInt(e.note.octave+2) == "C3") {
        console.log("C3 received");
        mimica.increaseShapes('N');
      }
      // curvasNivel specific functionality controlling
      curvasNivel.setParam(e.note.name + parseInt(e.note.octave+2),e.velocity);
    }
  );
});

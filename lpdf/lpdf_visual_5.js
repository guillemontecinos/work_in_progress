//Visual para proyecto LPDF
//Guillermo Montecinos
//22/07/2017
//sound response
//escena=1: balón gira, radio constante, aparece LPDF
//escena=2: balón gira, radio varía según volumen, parpadeo controlado midi/osc

//variables de control
var radio = 150;
var mic;
var micAnterior=0;
var micFiltered=0;
var alphaGain=0.4;
var escena=1; //escena=1: comienzo y fin / escena=2: sonido.

//variables de objeto
var balon;
var fondo=0;

function setup(){
  //canvas
  createCanvas(windowWidth,windowHeight);
  //objeto balon
  balon = new Pelota(radio,true);
  balon.setParches();
  //control por microfono
  mic = new p5.AudioIn()
  mic.start();
}

function draw(){
  //noCursor
  noCursor();
  //fondo y color
  evaluadorColor();
  background(fondo);
  //selector de escena
  if(escena == 1){
    //seteamos radio estándar del balón
    balon.radio = radio;
    //escribimos lpdf
    escribirLPDF();
    //definimos colores de comienzo
    balon.colorSelector=true;
    balon.pentagono.colorSelector=true;
    fondo=0;
    for (var i = 0; i < 5; i++) {
      balon.pentagonos[i].colorSelector=true;
    }
  }
  else if (escena == 2) {
    //recalculamos radio
    micFiltered = alphaGain*abs(mic.getLevel())+(1-alphaGain)*micAnterior;
    balon.radio = map(micFiltered,0,1,150,width/2);
    micAnterior = micFiltered;
    //observamos cambios en señal control fondo
    //TODO
  }
  //colocamos el balón en el centro
  translate(width/2,height/2);
  //rotamos el balón
  rotate(frameCount/(12*PI));
  //dibujamos el balón
  balon.display();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function escribirLPDF(){
  //escribimos lpdf
  textAlign(CENTER);
  textSize(150);
  fill(balon.color);
  textStyle(BOLD);
  text("LPDF",width/2,0.9*height/4);
}

//=====================================================
//Crear una pelota con 5 parches y un oentágono central
//Hacer que la pelota rote
//=====================================================

//objeto pelota
function Pelota(radio,colorSelector){
  this.radio = radio;
  this.colorSelector = colorSelector;//true=blanco,false=negro
  this.color = 0;
  this.pentagono = new Pentagono(radio/2.5,this.colorSelector);
  this.pentagonos = [];
  //this.parches = [];

  //selector de color
  this.colorSelect = function(){
    if (this.colorSelector==true) {
      this.color=255;
    }
    else {
      this.color=0;
    }
  }

  this.updateRadio = function(){
    this.pentagono.radio=this.radio/2.5;
    for (var i = 0; i < 5; i++) {
      this.pentagonos[i].radio = this.radio/2.5;
    }
  }
  //
  this.setParches = function(){
    for (var i = 0; i < 5; i++) {
      this.pentagonos[i] = new Pentagono(radio/2.5,this.colorSelector);
    }
  }

  this.displayMarcas = function(){
    //dibujamos haz de lineas
    for (var i = 0; i < 5; i++) {
      stroke(this.pentagono.color);
      line(0,0,this.radio*cos(PI*11/10+i*2*PI/5),this.radio*sin(PI*11/10+i*2*PI/5));
    }
    //dibujamos pentagono central
    this.pentagono.display();
    //dibujamos los 5 parches
    for (var i = 0; i < 5; i++) {
      push();
      translate(this.radio*cos(PI*11/10+i*2*PI/5),this.radio*sin(PI*11/10+i*2*PI/5));
      if (i==0||i==2||i==4) {
        rotate((1+i)*PI/5); //0, 2, 3
      }
      else{
        rotate(i*PI/5); //1 y 4
      }
      this.pentagonos[i].display();
      pop();
    }
  }

  this.display = function(){
    //actualizamos el radio de todos los objetos
    this.updateRadio();
    //seleccionamos color
    this.colorSelect();
    //dibujamos circulo
    fill(this.color);
    ellipse(0,0,2*this.radio,2*this.radio);
    //dibujamos marcas balon
    this.displayMarcas();
    //dibujamos anillo exterior
    stroke(this.color);
    noFill()
    ellipse(0,0,2*this.radio,2*this.radio);
  }
}

//objeto rombo o parche central
function Pentagono(radio,colorSelector){
  this.radio = radio;
  this.colorSelector = colorSelector;//1=blanco,0=negro
  this.color = 0;

  //selector de color
  this.colorSelect = function(){
    if (this.colorSelector==true) {
      this.color=0;
    }
    else {
      this.color=255;
    }
  }

  //funcion dibujar
  this.display = function(){
    //seleccionamos el color
    this.colorSelect();
    //generamos forma
    push();
    noStroke();
    fill(this.color);
    //translate(width/2,height/2);
    beginShape();
    for (var i = 0; i < 5; i++) {
      var angulo = PI*11/10+i*2*PI/5;
      //print(angulo);
      vertex(this.radio*cos(angulo),this.radio*sin(angulo));
    }
    endShape(CLOSE);
    pop();
  }
}

function evaluadorColor(){
  if(abs(mic.getLevel())>0.4){
    if (escena == 2) {
      balon.colorSelector=!balon.colorSelector;
      balon.pentagono.colorSelector=!balon.pentagono.colorSelector;
      if(fondo==0){
        fondo=255;
      }
      else {
        fondo=0;
      }
      for (var i = 0; i < 5; i++) {
        balon.pentagonos[i].colorSelector=!balon.pentagonos[i].colorSelector;
      }
    }
  }
}

//funció selector de colores utilizando el mouse pad
/*
function mousePressed(){
  if (escena == 2) {
    balon.colorSelector=!balon.colorSelector;
    balon.pentagono.colorSelector=!balon.pentagono.colorSelector;
    if(fondo==0){
      fondo=255;
    }
    else {
      fondo=0;
    }
    for (var i = 0; i < 5; i++) {
      balon.pentagonos[i].colorSelector=!balon.pentagonos[i].colorSelector;
    }
  }
}
*/

function keyPressed(){
  if (keyCode == 49) {
    escena = 1;
  }
  else if(keyCode == 50) {
    escena = 2;
  }
}

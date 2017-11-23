//Visual para proyecto LPDF
//Guillermo Montecinos
//22/07/2017

//variables de control
var radio=300;

//variables de objeto
var balon;
var fondo=0;

function setup(){
  createCanvas(windowWidth,windowHeight);
  balon = new Pelota(radio,true);
  balon.setParches();
}

function draw(){
  //recalculamos radio
  balon.radio = abs(mouseX-width/2);
  //fondo
  background(fondo);
  //colocamos el balón en el centro
  translate(width/2,height/2);
  //rotamos el balón
  //rotate(2*(mouseX-width/2)/width);
  rotate(frameCount/(10*PI));
  //dibujamos el balón
  balon.display();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
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

//objeto parche
function Parche(radio,colorSelector){
  this.radio = radio;
  this.colorSelector = colorSelector;
  this.color=0;

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
    //pintamos el parche
    fill(this.color);
    push();
    beginShape();
    vertex(this.radio*cos(PI*11/10),this.radio*sin(PI*11/10));
    vertex(this.radio*cos(PI*11/10+2*PI/5),this.radio*sin(PI*11/10+2*PI/5));
    vertex(this.radio*cos(PI*11/10+4*PI/5),this.radio*sin(PI*11/10+4*PI/5));
    endShape(CLOSE);
    pop();
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

function mousePressed(){
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

var balon;
var fondo=0;

function setup(){
  createCanvas(windowWidth,windowHeight);
  balon = new Pelota(150,true);
  balon.setParches();
}

function draw(){
  background(fondo);
  //colocamos el balón en el centro
  translate(width/2,height/2);
  //rotamos el balón
  //rotate(frameCount/(10*PI));
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
  this.parches = [];

  //selector de color
  this.colorSelect = function(){
    if (this.colorSelector==true) {
      this.color=255;
    }
    else {
      this.color=0;
    }
  }

  this.setParches = function(){
    for (var i = 0; i < 5; i++) {
      this.parches[i] = new Parche(radio/2.5,this.colorSelector);
    }
  }

  this.display = function(){
    //seleccionamos color
    this.colorSelect();
    //dibujamos circulo
    fill(this.color);
    ellipse(0,0,2*this.radio,2*this.radio);
    //dibujamos pentagono
    this.pentagono.display();
    //dibujamos los 5 parches
    for (var i = 0; i < 5; i++) {
      push();
      //translate(this.radio*cos(PI*8/5+i*2*PI/5),this.radio*sin(PI*8/5+i*2*PI/5));
      translate(this.radio*cos(PI*11/10+i*2*PI/5),this.radio*sin(PI*11/10+i*2*PI/5));
      //rotate(PI*11/10+i*2*PI/5);
      this.parches[i].display();
      pop();
    }
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
    balon.parches[i].colorSelector=!balon.parches[i].colorSelector;
  }
}

var balon;
var fondo=0;

function setup(){
  createCanvas(windowWidth,windowHeight);
  balon = new Pelota(150,true);
}

function draw(){
  background(fondo);
  //colocamos el balón en el centro
  translate(width/2,height/2);
  //rotamos el balón
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
  this.pentagono = new Pentagono(radio/2.5,colorSelector);

  //selector de color
  this.colorSelect = function(){
    if (this.colorSelector==true) {
      this.color=255;
    }
    else {
      this.color=0;
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
  }
}

//objeto parche
function Parche(){

}

//objeto rombo o parche central
function Pentagono(radio,colorSelector){
  this.radio = radio;
  this.colorSelector = colorSelector;//1=blanco,0=negro
  this.color = true;

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
}

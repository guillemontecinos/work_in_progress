//Guillermo Montecinos
//2017 04 10
//Import libraries

Circulo circulo;

void setup(){
  size(640,320);
  circulo = new Circulo(width/2,height/2,60);
}

void draw(){
  background(255);
  circulo.update();
}

class Circulo{
  float x;
  float y;
  float radio;
  
  Circulo(float Xin, float Yin,float radIn){
    x=Xin;
    y=Yin;
    radio=radIn;
  }
  
  void update(){
    ellipse(x,y,radio,radio);
  }
}
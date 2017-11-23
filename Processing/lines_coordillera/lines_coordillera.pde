import ddf.minim.*;

PShape s;

int numBars=8;
int[] posX = new int[8];

//Objeto barra
Barra[] barras = new Barra[8];

//Objeto minim
Minim minim;
AudioInput in;

void setup(){
  size(1440,900);
  for(int i = 0; i<8; i++){
    posX[i]=i*width/8;
    barras[i] = new Barra(posX[i],50);
  }
  
  s = loadShape("coordillera.svg");
  //s.disableStyle();
  
  //Declare minim
  minim = new Minim(this);
  in = minim.getLineIn();
}

void draw(){
  frameRate(30);
  background(0);
  
  scale(1+.8*abs(in.mix.get(0)));
  shape(s, 0, 0, 800, 400);
  
  for(int i = 0; i<8; i++){
    barras[i].update();
    barras[i].ancho=int(150*abs(in.mix.get(i)));
  }
  //stroke(20);
  //strokeWeight(20);
  //noFill();
  //ellipse(width/2,height/2,300,300);
  //shape(s, 100, 0, 800, 400);
  
}

class Barra{
  //Variables
  float barraX;
  int ancho;
  //Constructor
  Barra(float auxX, int auxAncho){
    barraX=auxX;
    ancho = auxAncho;
  }
  //Funciones
  void update(){
    noStroke();
    fill(255);
    rect(barraX,0,ancho,height);
  }
}
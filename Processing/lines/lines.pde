import ddf.minim.*;

int numBars=8;
int[] posX = new int[8];
int ancho;

//Objeto barra
Barra[] barras = new Barra[8];

//Objeto minim
Minim minim;
AudioInput in;

void setup(){
  size(1440,900);
  for(int i = 0; i<8; i++){
    posX[i]=(i+1)*width/8;
    barras[i] = new Barra(posX[i],50);
  }
  
  //Declare minim
  minim = new Minim(this);
  in = minim.getLineIn();
}

void draw(){
  background(20);
  for(int i = 0; i<8; i++){
    barras[i].ancho=int(150*abs(in.mix.get(i)));
    barras[i].update();
    
  }
  stroke(20);
  strokeWeight(20);
  noFill();
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
    rectMode(CENTER);
    noStroke();
    fill(255);
    rect(barraX,height/2,ancho,height);
  }
}
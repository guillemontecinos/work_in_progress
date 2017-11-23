//Guillermo Montecinos
//2017 04 12
//Circulos bailarines multimovimiento

//Import libraries
import ddf.minim.*;

//Declare minim objects
Minim minim;
AudioPlayer song;

//Declare Cuerpo objects
Cuerpo[] cuerpos = new Cuerpo[8];

//Declare Vector arrays
PVector[] origen = new PVector[8];
PVector[] posActual = new PVector[8];
PVector[] destino = new PVector[8];

//Global Vars
int numCuerpos;
float pesoMin, pesoMax;

void setup(){
  size(1440,900);
  numCuerpos=8;
  pesoMin=0.4;
  pesoMax=1;
  for(int i=0;i<numCuerpos;i++){
    origen[i] = new PVector((i+1)*width/(numCuerpos+1),height/2);
    posActual[i] = origen[i].copy();
    destino[i] = new PVector((i+1)*width/(numCuerpos+1),(i+1)*height/(numCuerpos+1));
    cuerpos[i] = new Cuerpo(origen[i], posActual[i], destino[i], 2,true,90,0,random(pesoMin*255,pesoMax*255),random(pesoMin*255,pesoMax*255),random(pesoMin*255,pesoMax*255));
  }
  //Minim
  minim = new Minim(this);
  //Minim load song
  song = minim.loadFile("wfishes.mp3",1024);
  song.play();
 }

void draw(){
  //
  background(10);
  for(int i=0;i<numCuerpos;i++){
    cuerpos[i].radioVar=25*abs(song.mix.get(i));
    cuerpos[i].update();
    if(cuerpos[i].vLlego==false){
      cuerpos[i].mover();
      cuerpos[i].checkPos();
    }
  }
  
}

void keyPressed(){
  for(int i=0;i<numCuerpos;i++){
    if(cuerpos[i].vLlego==true){
      cuerpos[i].vLlego=false;
    }
  }
}


class Cuerpo{
  //Variables
  PVector v1, vActual, v2, vDir, aux;
  int vRap;
  boolean vLlego;
  float radioBase, radioVar, vRed, vGreen, vBlue;
  //Constructor
  Cuerpo(PVector origen, PVector posActual, PVector destino, int rapidez, boolean llego, float radIn, float radVar, float rojo, float verde, float azul){
    v1 = origen;
    vActual = posActual;
    v2 = destino;
    vRap = rapidez;
    vLlego = llego;
    radioBase = radIn;
    radioVar = radVar;
    vRed = rojo;
    vGreen = verde;
    vBlue = azul;
  }
  //Functions
  void update(){
    noStroke();
    fill(vRed,vGreen,vBlue);
    ellipse(vActual.x,vActual.y,radioBase+radioVar,radioBase+radioVar);
  }
  
  void mover(){
    vDir = PVector.sub(v2,vActual);
    vDir.normalize();
    vDir.mult(vRap);
    vActual = vActual.add(vDir);
  }
  
  void checkPos(){
    PVector aux = new PVector();
    if(PVector.dist(vActual,v2)<1){
      //change vectors direction
      aux=v1.copy();
      v1=v2.copy();
      v2=aux.copy();
      vLlego = true;
    }
    else{
      vLlego = false;
    }
  }
}
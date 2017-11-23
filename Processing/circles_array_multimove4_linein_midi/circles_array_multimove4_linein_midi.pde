//Guillermo Montecinos
//2017 04 16
//Circulos bailarines multimovimiento gatillado via midi

//Import libraries
import ddf.minim.*;
import themidibus.*;
import javax.sound.midi.MidiMessage;

//Declar midi bus objects
MidiBus myBus;

//Declare minim objects
Minim minim;
AudioInput in;

//Declare Cuerpo objects
Cuerpo[] cuerpos = new Cuerpo[8];

//Declare Vector arrays
PVector[] set1 = new PVector[8];
PVector[] set2 = new PVector[8];
PVector[] set3 = new PVector[8];
PVector[] set4 = new PVector[8];
PVector[] posActual = new PVector[8];

//Global Vars
int numCuerpos;
int rapidez;
float pesoMin, pesoMax;
boolean encendido;

void setup(){
  size(1440,900);
  numCuerpos=8;
  pesoMin=0.7;
  pesoMax=1;
  encendido=false;
  rapidez=3;
  //Declare cuerpos
  for(int i=0;i<numCuerpos;i++){
    set1[i] = new PVector((i+1)*width/(numCuerpos+1),height/2);
    set2[i] = new PVector((i+1)*width/(numCuerpos+1),(i+1)*height/(numCuerpos+1));
    set3[i] = new PVector(width/2,(i+1)*height/(numCuerpos+1));
    set4[i] = new PVector((numCuerpos-i)*width/(numCuerpos+1),(i+1)*height/(numCuerpos+1));
    posActual[i] = set1[i].copy();
    cuerpos[i] = new Cuerpo(set1[i], posActual[i], set2[i], rapidez,true,100,0,random(pesoMin*255,pesoMax*255),random(pesoMin*255,pesoMax*255),random(pesoMin*255,pesoMax*255));
  }
  //Minim
  minim = new Minim(this);
  //Minim load song
  /*
  song = minim.loadFile("wfishes.mp3",1024);
  song.play();*/
  in = minim.getLineIn();
  //Midi bus
  MidiBus.list();
  myBus = new MidiBus(this,0,1);
 }

void draw(){
  //
  background(10);
  //The first click turns it on.
  if(encendido==true){
      for(int i=0;i<numCuerpos;i++){
        cuerpos[i].radioVar=30*abs(in.mix.get(i));
        cuerpos[i].update();
      if(cuerpos[i].vLlego==false){
        cuerpos[i].mover();
        cuerpos[i].checkPos();
      }
    }
  }
}


void keyPressed(){
  //If move is off, turn on
  if(encendido==false){
    encendido=true;
  }
  else{
    for(int i=0;i<numCuerpos;i++){
      if(cuerpos[i].vLlego==true){
        cuerpos[i].vLlego=false;
      }
    }
  }
  //If pressed key equals 1, 2 or 3 change the destination vector
  if(key=='1'){
    for(int i=0;i<numCuerpos;i++){
        cuerpos[i].changePos(set1[i]);
      }
  }
  else if(key=='2'){
    for(int i=0;i<numCuerpos;i++){
        cuerpos[i].changePos(set2[i]);
      }
  }
  else if(key=='3'){
    for(int i=0;i<numCuerpos;i++){
        cuerpos[i].changePos(set3[i]);
      }
  }
  else if(key=='4'){
    for(int i=0;i<numCuerpos;i++){
        cuerpos[i].changePos(set4[i]);
      }
  }
  //
}


void midiMessage(MidiMessage message, long timestamp, String bus_name) { 
  int note = (int)(message.getMessage()[1] & 0xFF) ;
  //
  //If move is off, turn on
  if(encendido==false){
    encendido=true;
  }
  else{
    for(int i=0;i<numCuerpos;i++){
      if(cuerpos[i].vLlego==true){
        cuerpos[i].vLlego=false;
      }
    }
  }
  //If pressed key equals 1, 2 or 3 change the destination vector
  if(note==61){
    for(int i=0;i<numCuerpos;i++){
        cuerpos[i].changePos(set1[i]);
      }
  }
  else if(note==62){
    for(int i=0;i<numCuerpos;i++){
        cuerpos[i].changePos(set2[i]);
      }
  }
  else if(note==63){
    for(int i=0;i<numCuerpos;i++){
        cuerpos[i].changePos(set3[i]);
      }
  }
  else if(note==64){
    for(int i=0;i<numCuerpos;i++){
        cuerpos[i].changePos(set4[i]);
      }
  }
  //
  println(note);
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
    if(PVector.dist(vActual,v2)<=vRap){
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
  
  void changePos(PVector v3){
    v2=v3.copy();
  }
}
//Guillermo Montecinos
//2017 04 10
//Circulos bailarines

//Import libraries
import ddf.minim.*;

//Declare objects
Circulo[] circulos = new Circulo[4];
Minim minim;
//AudioPlayer song;
AudioInput in;

//Global Vars
int numCirc;

void setup(){
  size(400,200);
  
  //Initialize vars
  numCirc=4;
  
  //Create objects
  for(int i=0;i<numCirc;i++){
    circulos[i]= new Circulo((i+1)*width/(numCirc+1),height/2,50,0);
  }
  minim = new Minim(this);
  
  /*
  //Load song
  song = minim.loadFile("wfishes.mp3",1024);
  song.play();*/
  in = minim.getLineIn();
}

void draw(){
  frameRate(30);
  background(255);
  for(int i=0; i<numCirc; i++){
    //circulos[i].radioVar=25*abs(song.mix.get(i));
    circulos[i].radioVar=25*abs(in.mix.get(i));
    circulos[i].update();
  }
  
}

class Circulo{
  float x;
  float y;
  float radioBase;
  float radioVar;
  
  Circulo(float Xin, float Yin,float radIn, float radVar){
    x=Xin;
    y=Yin;
    radioBase=radIn;
    radioVar=radVar;
  }
  
  void update(){
    strokeWeight(4);
    ellipse(x,y,radioBase+radioVar,radioBase+radioVar);
  }
}
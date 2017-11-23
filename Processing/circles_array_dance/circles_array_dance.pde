//Guillermo Montecinos
//2017 04 10
//Circulos bailarines

//Import libraries
import ddf.minim.*;

//Declare objects
Circulo circulo1;
Circulo circulo2;
Minim minim;
AudioPlayer song;

void setup(){
  size(300,200);
  
  //Create objects
  circulo1 = new Circulo(width/4,height/2,50,0);
  circulo2 = new Circulo(3*width/4,height/2,50,0);
  minim = new Minim(this);
  
  //Load song
  song = minim.loadFile("wfishes.mp3",1024);
  song.play();
}

void draw(){
  frameRate(30);
  background(255);
  //println(circulo.radioBase+circulo.radioVar);
  
  circulo1.radioVar=25*abs(song.mix.get(0));
  circulo2.radioVar=25*abs(song.mix.get(1));
  circulo1.update();
  circulo2.update();
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
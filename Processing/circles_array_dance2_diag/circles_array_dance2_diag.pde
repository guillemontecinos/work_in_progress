//Guillermo Montecinos
//2017 04 10
//Circulos bailarines

//Import libraries
import ddf.minim.*;

//Declare objects
/*Circulo circulo1;
 Circulo circulo2;*/
Circulo[] circulos = new Circulo[8];
Minim minim;
AudioPlayer song;

//Global Vars
int numCirc;
float colorFondo;

void setup() {
  size(1440, 900);

  //Initialize vars
  numCirc=8;
  colorFondo=250;

  //Create objects
  for (int i=0; i<numCirc; i++) {
    circulos[i]= new Circulo((i+1)*width/(numCirc+1), (i+1)*height/(numCirc+1), 50, 0);
  }
  /*circulos[0] = new Circulo(width/4,height/2,50,0);
   circulos[1] = new Circulo(3*width/4,height/2,50,0);*/
  minim = new Minim(this);

  //Load song
  song = minim.loadFile("wfishes.mp3", 1024);
  song.play();
}

void draw() {
  frameRate(30);
  background(colorFondo);
  //println(circulo.radioBase+circulo.radioVar);
  for (int i=0; i<numCirc; i++) {
    circulos[i].radioVar=25*abs(song.mix.get(i));
    circulos[i].update();
  }

  /*
  circulos[0].radioVar=25*abs(song.mix.get(0));
   circulos[1].radioVar=25*abs(song.mix.get(1));
   circulos[0].update();
   circulos[1].update();*/
}

class Circulo {
  float x;
  float y;
  float radioBase;
  float radioVar;

  Circulo(float Xin, float Yin, float radIn, float radVar) {
    x=Xin;
    y=Yin;
    radioBase=radIn;
    radioVar=radVar;
  }

  void update() {
    stroke(colorFondo);
    strokeWeight(4);
    fill(220, 80, 80);
    ellipse(x, y, radioBase+radioVar, radioBase+radioVar);
  }
}
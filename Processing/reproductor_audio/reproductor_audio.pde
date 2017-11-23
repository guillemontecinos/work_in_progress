import ddf.minim.*;
 
Minim minim;
AudioPlayer song;
float ancho;
float alfa;
 
void setup()
{
  size(300, 200);
 
  minim = new Minim(this);
 
  // this loads mysong.wav from the data folder
  song = minim.loadFile("wfishes.mp3",1024);
  song.play();
  ancho=0;
  alfa=0;
  
}
 
void draw()
{
  frameRate(30);
  background(250);
  println(50*abs(song.mix.get(0)));
  ancho=50*abs(song.mix.get(0));
  alfa=255*abs(song.mix.get(0));
  
  strokeWeight(4);
  fill(200,100,100,255-alfa);
  //ellipse(width/2,height/2,50+ancho,50+ancho);
  ellipse(width/2,height/2,80,80);
}
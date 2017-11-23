float tinte;
int contadorTinte;

void setup(){
  size(500,400);
  colorMode(HSB,360,100,100);
  tinte=0;
  contadorTinte=0;
}

void draw(){
  frameRate(30);
  
  //fill(color(tinte,100,100));
  background(color(360,100,tinte));
  //ellipse(width/2,height/2,100,100);
  tinte = contadorTinte*360/60;
  
  if(tinte>100){
    contadorTinte=0;
  }
  
  println(tinte);
  contadorTinte++;
}
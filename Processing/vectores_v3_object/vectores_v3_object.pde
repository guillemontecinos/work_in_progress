PVector origen, posActual, destino, direccion, auxCheck;

Cuerpo cuerpo;

void setup(){
  size(400,400);
  origen = new PVector(100,100);
  posActual = origen.copy(); 
  destino = new PVector(300,300);
  direccion = new PVector();
  cuerpo = new Cuerpo(origen, posActual, destino, 2,false);
 }

void draw(){
  println("origen: "+cuerpo.v1);
  println("posActual: "+cuerpo.vActual);
  println("destino: "+cuerpo.v2);
  println("llegó: "+cuerpo.vLlego);
  //
  background(255);
  cuerpo.update();
  //
  if(cuerpo.vLlego==false){
    cuerpo.mover();
    cuerpo.checkPos();
  }
  
}

void keyPressed(){
  if(cuerpo.vLlego==true){
    cuerpo.vLlego=false;
  }
}


class Cuerpo{
  //Variables
  PVector v1, vActual, v2, vDir, aux;
  int vRap;
  boolean vLlego;
  //Constructor
  Cuerpo(PVector origen, PVector posActual, PVector destino, int rapidez, boolean llego){
    v1 = origen;
    vActual = posActual;
    v2 = destino;
    vRap = rapidez;
    vLlego = llego;
  }
  //Functions
  void update(){
    ellipse(vActual.x,vActual.y,50,50);
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
      posActual=v2.copy();
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
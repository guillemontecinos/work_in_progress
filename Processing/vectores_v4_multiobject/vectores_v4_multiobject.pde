PVector[] origen = new PVector[8];
PVector[] posActual = new PVector[8];
PVector[] destino = new PVector[8];
Cuerpo[] cuerpos = new Cuerpo[8];

int numCuerpos;

void setup(){
  size(1440,900);
  numCuerpos=8;
  for(int i=0;i<numCuerpos;i++){
    origen[i] = new PVector((i+1)*width/(numCuerpos+1),height/2);
    posActual[i] = origen[i].copy();
    destino[i] = new PVector((i+1)*width/(numCuerpos+1),(i+1)*height/(numCuerpos+1));
    cuerpos[i] = new Cuerpo(origen[i], posActual[i], destino[i], 2,false);
  }
  
 }

void draw(){
  //
  background(255);
  for(int i=0;i<numCuerpos;i++){
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
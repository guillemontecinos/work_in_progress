PVector origen, posActual, destino, direccion, auxCheck;
int rapidez;
boolean llego;

void setup(){
  size(400,400);
  origen = new PVector(100,100);
  posActual = origen.copy(); 
  destino = new PVector(300,300);
  direccion = new PVector();
  auxCheck = new PVector();
  rapidez = 2;
  llego = false;
}

void draw(){
  println("origen: "+origen);
  println("posActual: "+posActual);
  println("destino: "+destino);
  println("llegó: "+llego);
  //
  background(255);
  update();
  //
  if(llego==false){
    mover();
    checkPos();
  }
  
}

void update(){
  ellipse(posActual.x,posActual.y,50,50);
}

void mover(){
    direccion = PVector.sub(destino,posActual);
    direccion.normalize();
    direccion.mult(rapidez);
    posActual = posActual.add(direccion);
}

void checkPos(){
  PVector aux = new PVector();
  //
  if(PVector.dist(posActual,destino)<1){
    posActual=destino.copy();
    //change vectors direction
    aux=origen.copy();
    origen=destino.copy();
    destino=aux.copy();
    llego = true;
  }
  else{
    llego = false;
  }
}

void keyPressed(){
  if(llego==true){
    llego=false;
  }
}
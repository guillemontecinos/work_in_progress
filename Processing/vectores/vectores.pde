PVector origen, posActual, destino, direccion, auxSentido;
int rapidez;

void setup(){
  size(400,400);
  origen = new PVector(100,100);
  posActual = origen.copy(); 
  destino = new PVector(300,300);
  direccion = new PVector();
  auxSentido = new PVector();
  rapidez = 2;
}

void draw(){
  println(origen);
  println(posActual);
  println(destino);
  //
  background(255);
  ellipse(posActual.x,posActual.y,50,50);
  mover();
  sentido();
}

void mover(){
  if(PVector.dist(posActual,destino)>1){
    direccion = PVector.sub(destino,posActual);
    direccion.normalize();
    direccion.mult(rapidez);
    posActual = posActual.add(direccion);
  }
  else{
    posActual = destino.copy();
  }
}

void sentido(){
  if(PVector.dist(posActual,origen)==0){
    //direccion = PVector.sub(destino,posActual);
    auxSentido=origen.copy(); //<>//
    origen=destino.copy();
    destino=auxSentido.copy();
  }
  else if(PVector.dist(posActual,destino)==0){
    //direccion = PVector.sub(origen,posActual);
    auxSentido=destino.copy(); //<>//
    destino=destino.copy();
    destino=auxSentido.copy();
  }
}
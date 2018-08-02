import processing.pdf.*;


PVector[][] puntos;
int numPuntos = 40;
int numLineas;
int step = 10;

void setup(){
  size(1000,700);
  //size(1000,700, PDF, "relieve.pdf");
  numLineas = int(height/step);
  puntos = new PVector[numLineas][numPuntos + 1];
  for(int i = 0; i < puntos.length; i++){
    for(int j = 0; j < puntos[i].length; j++){
      puntos[i][j] = new PVector(0,0);
    } 
  }
}

void draw(){
  //PGraphicsPDF pdf = (PGraphicsPDF) g;
  background(255);
  //randomSeed(int(map(mouseX,0,width,0,100)));
  if(frameCount%10==0){
    for(int i = 0; i < puntos.length; i++){
      puntos[i][0].set(0,i*-step+random(-10,10));
      for(int j = 1; j < puntos[i].length; j++){
        if(i == 0){
          puntos[i][j].set(j*width/numPuntos, puntos[i][j-1].y + int(random(-2,2))*10*noise(j));
        }
        else{
          puntos[i][j].set(j*width/numPuntos, (puntos[i-1][j].y-step+random(-10,10))*.5 + puntos[i][j-1].y*.5 + 10*map(noise(i*j),0,1,-1,1));
        }
      } 
    }  
  }
  
  stroke(0);
  strokeWeight(1);
  translate(0,height);
  for(int i = 0; i < puntos.length; i++){
    for(int j = 1; j < puntos[i].length; j++){
      line(puntos[i][j-1].x, puntos[i][j-1].y, puntos[i][j].x, puntos[i][j].y);
    } 
  }
  /*
  if(frameCount==100){
    exit();
  }
  else{
    pdf.nextPage();
  }
  */
}

/*
void drawLine(point1,point2){
  exit();
}
*/
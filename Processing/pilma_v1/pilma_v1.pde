int[][][] pilma = new int[20][3][2];
int muestra = 20*3*2;
PVector[] datos = new PVector[muestra];

void setup(){
  size(800,800,P3D);
  //crear vector
  for(int i = 0; i < pilma.length; i++){
    for(int j = 0; j < pilma[i].length; j++){
      pilma[i][j][0] = int(random(100));
      pilma[i][j][1] = int(random(100));
    }
  }
  //crear puntos
  int contador = 0;
  for(int i = 0; i< pilma.length; i++){
    int x = i;
    for(int j = 0; j< pilma[i].length; j++){
      int y = pilma[i][j][0];
      int z = pilma[i][j][1];
      datos[contador].set(x,y,z);
      contador++;
    }
  }
}

void draw(){
  background(255);
  translate(width/2,height/2);
  beginShape(POINTS);
  for(int i = 0; i < datos.length; i++){
    vertex(datos[i].x,datos[i].y,datos[i].z);
  }
  endShape();
  //rotateX(frameCount*PI/100);
  //rotateY(frameCount*PI/100);
  
  
}
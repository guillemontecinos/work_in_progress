PShape sc;

void setup(){
  size(1000,1000,P3D);
  sc = loadShape("sc2.svg");
}

void draw(){
  shape(sc,0,0,2000,1000);
}
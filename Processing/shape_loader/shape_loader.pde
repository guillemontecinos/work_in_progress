  
PShape s;

void setup() {
  size(1000, 500);
  // The file "bot.svg" must be in the data folder
  // of the current sketch to load successfully
  s = loadShape("coordillera.svg");
}

void draw() {
  
  shape(s, 100, 0, 800, 400);
}
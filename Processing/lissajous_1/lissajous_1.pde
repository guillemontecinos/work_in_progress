//Lissaojous exercises
//from p5.js
//for visuals in Sector Coordillera
//Guillermo Montecinos

int rad = 300;
int a = 1;
int b = 1;
int tailLength = 15;
PVector[] tail = new PVector[tailLength];
PVector[] aux = new PVector[tailLength];

void setup(){
  fullScreen();
  for(int i = 0; i < tail.length; i++){
    tail[i].set(0,0);
    aux[i].set(0,0);
  }
  // color model
  colorMode(HSB,1);
  // no cursor
  noCursor();
}

void draw(){
  // environment
  // background('rgba(0,0,0,'+backAlpha+')');
  background(0);
  // update tail
  updateTail();
  // writeLissajous parameters
  // writeLissajous();
  // draw radious
  // stroke(255);
  // strokeWeight(1);
  // line(0,0,tail[0].x, tail[0].y);
  // log
  // console.log("a: " + a);
  // console.log("b: " + b);
  //TODO: continuar transcribiendo
}
  
void updateTail(){
  pushMatrix();
  // lissajous parameters. integers are modified in keyPressed()
  // positions
  translate(width/2,height/2);
  // shift
  for (int i = 0; i < tail.length; i++) {
    aux[i] = tail[i].copy();
  }
  tail[0].x = rad*cos(a*millis()/800);
  tail[0].y = rad*sin(b*millis()/800);
  for (int i = 0; i < tail.length-1; i++) {
    tail[i+1] = aux[i].copy();
  }
  // drawing dots
  strokeWeight(5);
  // color setting
  stroke(mouseX/width,mouseY/height,1);
  for (int i = 0; i < tail.length-1; i++) {
    line(tail[i].x, tail[i].y, tail[i+1].x, tail[i+1].y);
    // curve(0, 0, tail[i].x, tail[i].y, tail[i+1].x, tail[i+1].y, 0, 0);
    // arc(tail[i].x, tail[i].y, tail[i+1].x, tail[i+1].y,HALF_PI);
  }
  popMatrix();
}  

/*
void writeLissajous(){
  textSize(20);
  text('a: ' + a, 10, height - 60);
  fill(255);
  text('b: ' + b, 10, height - 40);
  fill(255);
}


void keyPressed() {
  if (keyCode === UP_ARROW) {
    a++;
  } else if (keyCode === DOWN_ARROW) {
    a--;
  }
  else if (keyCode === LEFT_ARROW) {
    b--;
  } else if (keyCode === RIGHT_ARROW) {
    b++;
  }
}
*/
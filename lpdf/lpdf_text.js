var diam = 300;

function setup(){
  createCanvas(1000,600);
}

function draw(){
  background(0);
  //ellipse(width/2,height/2,diam,diam);

  textAlign(CENTER);
  textSize(200);
  fill(255);
  textStyle(BOLD);
  text("LPDF",width/2,height/2);
}

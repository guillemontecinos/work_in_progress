// video reproducer using p5.js
// by Guillermo Montecinos commited by Sector Coordillera
// 01/08/2018

var vid;
function setup() {
  createCanvas(windowWidth, windowHeight);
  vid = createVideo("barti_boca.webm");
  vid.volume(0);
  vid.hide();
}
function draw() {
  background(0);
  image(vid,0,0,width,vid.height*width/vid.width);
}

function mouseClicked(){
  vid.loop();
}

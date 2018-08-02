// video reproducer using p5.js
// by Guillermo Montecinos commited by Sector Coordillera
// 01/08/2018

// var barti;
// var playing = false;
//
// function setup(){
//   createCanvas(500,500);
//   //pixelDensity(0);
//   barti = createVideo('barti_boca.mp4');
//   barti.volume(0);
//   barti.loop();
//   barti.hide();
//   noStroke();
// }
//
// function draw(){
//   background(255);
//   barti.loadPixels();
//   for (var y = 0; y < height; y++) {
//     for (var x = 0; x < width; x++) {
//       var index = (x + y * width) * 4;
//       var r = barti.pixels[index + 0];
//       var g = barti.pixels[index + 1];
//       var b = barti.pixels[index + 2];
//       var a = barti.pixels[index + 3];
//       set(r,g,b,a);
//     }
//   }
//   updatePixels();
// }

var vid;
function setup() {
  createCanvas(640,480);
  vid = createVideo("barti_boca.webm");
  vid.loop();
  vid.hide();
  noStroke();
}
function draw() {
  background(0);
  vid.loadPixels();
  for (var y = 0; y < height; y += 8) {
    for (var x = 0; x < width; x += 8) {
      var offset = ((y*width)+x)*4;
      fill(vid.pixels[offset],
        vid.pixels[offset+1],
        vid.pixels[offset+2]);
      rect(x, y, 8, 8);
    }
  }
}

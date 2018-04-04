// Tracking learning with tracking.js
// Guillermo Montecinos
// 31 de marzo de 2018

var video;

function setup(){
  createCanvas(500,500);
  video = createCapture(VIDEO);
}

function draw(){

}

// var tracker = new tracking.ObjectTracker(video,'face');
// tracker.setInitialScale(4);
// tracker.setStepSize(2);
// tracker.setEdgesDensity(0.1);
//
// tracking.track(video, tracker, { camera: true });
//
// tracker.on('track', function(event) {
//   context.clearRect(0, 0, canvas.width, canvas.height);
//
//   event.data.forEach(function(rect) {
//     context.strokeStyle = '#a64ceb';
//     context.strokeRect(rect.x, rect.y, rect.width, rect.height);
//     context.font = '11px Helvetica';
//     context.fillStyle = "#fff";
//     context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
//     context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
//   });
// });

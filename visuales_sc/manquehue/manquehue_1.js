//manquehue_1: visuals for Sector Coordillera
//Todo: load a json file containing a bunch of points that represents level curves
//Guillermo Montecinos
//2017 12 26

var points = [];
var converted = false;

//load the .json file
function preload(){
  myPolyline = loadJSON("points.json");
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  background(0);
}

function draw(){
  //wait for 3 to load .json data becaus loadJOSN() is an asynchronous function
  if(converted==false && millis() >= 3000){
    polyToArray();
    converted=true;
    console.log("Loaded!");
  }
  //draw lines
  drawCurve(points);
}

//this function converts the .json data into a set of vectors
function polyToArray(){
  //TODO: make it for a generic number of points
  for (var i = 0; i < myPolyline.polyline.length; i++) {
    points[i] = createVector(myPolyline.polyline[i].x, myPolyline.polyline[i].y);
  }
}

//this function draws a set of points into a line
function drawCurve(myPoints){
  stroke(255);
  strokeWeight(2);
  for (var i = 0; i < myPoints.length-1; i++) {
    line(myPoints[i].x, myPoints[i].y, myPoints[i+1].x, myPoints[i+1].y);
  }
}

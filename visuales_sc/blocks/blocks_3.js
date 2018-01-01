// blocks based visuales for Sector Coordillera
// by Guillermo Montecinos

var numPiles = 3;
var blocksPerPile = 5;
var verticalMargin = .2;
var horizontalMargin = .15;
var separation = 3;
var blockHeight;
var blockWidth;
var mode = 1;
var piles;

function setup(){
  colorMode(HSB,1);
  createCanvas(windowWidth, windowHeight);
  setBlockPos(blockWidth, blockHeight, horizontalMargin, verticalMargin, numPiles, blocksPerPile, separation);
}

function draw(){
  background('rgb(0,0,0)');
  // TODO: experiment with piles' heights
  // updateBlockPos(blockWidth, blockHeight*mouseY/height, horizontalMargin, verticalMargin, numPiles, blocksPerPile, separation);
  // drawBlocks(blockWidth, blockHeight*mouseY/height);
  updateBlockPos(blockWidth, blockHeight, horizontalMargin, verticalMargin, numPiles, blocksPerPile, separation);
  if (mode == 1) {
    drawWhiteBlocks(blockWidth, blockHeight);
  }
  else if (mode == 2) {
    // TODO: set sinusoidal color
    drawColoredBlocks(blockWidth, blockHeight);
  }
  else if (mode == 3) {
    drawSinBlocks(blockWidth, blockHeight, numPiles);
  }
  else if (mode == 4) {
    drawNoisyBlocks(blockWidth, blockHeight, numPiles);
  }
  writeData();
}

function setBlockPos(bWidth, bHeight, hMargin, vMargin, nPiles, bPPile, span){
  blockHeight = (height * (1 - ( 2 * verticalMargin)) - separation * (blocksPerPile - 1)) / blocksPerPile;
  blockWidth = (width * (1 - ( 2 * horizontalMargin)) - separation * (numPiles - 1)) / numPiles;
  piles = 0;
  piles = [];
  var auxX = width * hMargin;
  for(var i = 0; i < nPiles; i++){
    var auxY = height * (1 - vMargin);
    var auxBlocks = [];
    for (var j = 0; j < bPPile; j++) {
      auxY -= bHeight;
      auxBlocks[j] = createVector(auxX,auxY);
      auxY -= span; //separation between blok and block
    }
    piles[i] = auxBlocks;
    auxX += bWidth + span;
  }
}

function updateBlockPos(bWidth, bHeight, hMargin, vMargin, nPiles, bPPile, span){
  var auxX = width * hMargin;
  for(var i = 0; i < nPiles; i++){
    var auxY = height * (1 - vMargin);
    var auxBlocks = [];
    for (var j = 0; j < bPPile; j++) {
      auxY -= bHeight;
      piles[i][j].set(auxX,auxY);
      auxY -= span; //separation between blok and block
    }
    auxX += bWidth + span;
  }
}

function drawWhiteBlocks(bWidth, bHeight){
  noStroke();
  for (var i = 0; i < piles.length; i++) {
    for (var j = 0; j < piles[i].length; j++) {
      fill('rgb(255,255,255)');
      rect(piles[i][j].x, piles[i][j].y, bWidth, bHeight);
    }
  }
}

function drawColoredBlocks(bWidth, bHeight){
  // sinusoidal coloring
  var alpha = TWO_PI / (numPiles * blocksPerPile);
  var counter = 0;
  noStroke();
  for (var i = 0; i < piles.length; i++) {
    for (var j = 0; j < piles[i].length; j++) {
      fill(map(sin(millis()/800 + counter * alpha),-1,1,0,1),mouseX/width,mouseY/height);
      // fill(mouseX,255,255);
      rect(piles[i][j].x, piles[i][j].y, bWidth, bHeight);
      counter++;
    }
  }
}

function drawSinBlocks(bWidth, bHeight, nPiles){
  noStroke();
  var alphaAux = TWO_PI / nPiles;
  var auxHeight = [];
  var counter = 0;
  for (var i = 0; i < piles.length; i++) {
    // sinusoidal height
    auxHeight[i] = bHeight*map(sin(millis()/800 + i * alphaAux),-1,1,0.1,1);
    updateBlockPos(bWidth, auxHeight[i], horizontalMargin, verticalMargin, numPiles, blocksPerPile, separation);
    // TODO: make it more efficient because every position is being calculated each time
    for (var j = 0; j < piles[i].length; j++) {
      // white color
      fill('rgb(255,255,255)');
      rect(piles[i][j].x, piles[i][j].y, bWidth, auxHeight[i]);
      counter++;
    }
  }
}

function drawNoisyBlocks(bWidth, bHeight, nPiles){
  noStroke();
  var alphaAux = TWO_PI / nPiles;
  var auxHeight = [];
  var counter = 0;
  for (var i = 0; i < piles.length; i++) {
    // noise height
    auxHeight[i] = bHeight*noise(millis()/800 + i * alphaAux);
    updateBlockPos(bWidth, auxHeight[i], horizontalMargin, verticalMargin, numPiles, blocksPerPile, separation);
    // TODO: make it more efficient because every position is being calculated each time
    for (var j = 0; j < piles[i].length; j++) {
      // sinusoidal color
      fill(map(sin(millis()/800 + counter * alphaAux),-1,1,0,1),mouseX/width,mouseY/height);
      rect(piles[i][j].x, piles[i][j].y, bWidth, auxHeight[i]);
      counter++;
    }
  }
}

function writeData(){
  fill(255);
  textSize(20);
  text('#Piles: ' + numPiles, 10, height - 60);
  fill(255);
  text('B/Pile: ' + blocksPerPile, 10, height - 40);
  fill(255);
  text('mode: ' + mode, 10, height - 20);

}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    blocksPerPile++;
    setBlockPos(blockWidth, blockHeight, horizontalMargin, verticalMargin, numPiles, blocksPerPile, separation);
  } else if (keyCode === DOWN_ARROW) {
    blocksPerPile--;
    setBlockPos(blockWidth, blockHeight, horizontalMargin, verticalMargin, numPiles, blocksPerPile, separation);
  }
  else if (keyCode === LEFT_ARROW) {
    numPiles--;
    setBlockPos(blockWidth, blockHeight, horizontalMargin, verticalMargin, numPiles, blocksPerPile, separation);
  } else if (keyCode === RIGHT_ARROW) {
    numPiles++;
    setBlockPos(blockWidth, blockHeight, horizontalMargin, verticalMargin, numPiles, blocksPerPile, separation);
  }
  else if (key === '1') {
  mode = 1;
  }
  else if (key === '2') {
  mode = 2;
  }
  else if (key === '3') {
  mode = 3;
  }
  else if (key === '4') {
  mode = 4;
  }
}

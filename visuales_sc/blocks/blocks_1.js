// blocks based visuales for Sector Coordillera
// by Guillermo Montecinos

var numPiles = 3;
var blocksPerPile = 5;
var verticalMargin = .3;
var horizontalMargin = .2;
var separation = 5;
var blockHeight;
var blockWidth;
var piles = [];

function setup(){
  createCanvas(windowWidth, windowHeight);
  blockHeight = (height * (1 - ( 2 * verticalMargin)) - separation * (blocksPerPile - 1)) / blocksPerPile;
  blockWidth = (width * (1 - ( 2 * horizontalMargin)) - separation * (numPiles - 1)) / numPiles;
  setBlockPos(blockWidth, blockHeight, horizontalMargin, verticalMargin, numPiles, blocksPerPile, separation);
}

function draw(){
  background(0);
  updateBlockPos(blockWidth, blockHeight*mouseY/height, horizontalMargin, verticalMargin, numPiles, blocksPerPile, separation);
  drawBlocks(blockWidth, blockHeight*mouseY/height);
  // console.log(blockHeight);
  // console.log(blockWidth);
}

function setBlockPos(bWidth, bHeight, hMargin, vMargin, nPiles, bPPile, span){
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

function drawBlocks(bWidth, bHeight){
  noStroke();
  for (var i = 0; i < piles.length; i++) {
    for (var j = 0; j < piles[i].length; j++) {
      rect(piles[i][j].x, piles[i][j].y, bWidth, bHeight);
    }
  }
}

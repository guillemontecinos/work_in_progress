// Color screening
// visuals for sector coordillera
// by Guillermo Montecinos
//

//=====================================================
// Pantalla Colores Instance
//=====================================================

function PantallaColores(){
  // variables
  this.deltaTono = 100/50;
  this.countTono = 0;
  this.x = 0;
  this.fondos;

  // methods
  this.setupPantallas = function(){
    background(0);
    colorMode(HSB,100);
    noStroke();
    this.fondos = [];
  }

  this.drawPantallas = function(){
    background(0);
    for (var i = 0; i < this.fondos.length; i++) {
      this.fondos[i].update();
    }
  }

  this.createScreen = function(){
    //crear nuevo rect
    this.fondos.push(new rectScreen(width, height, this.deltaTono, this.countTono, 58, 75));
    this.countTono++;
    if(this.countTono == 51){
      this.countTono = 0;
    }
    // console.log(this.countTono);
  }

  this.triggerScreen = function(note){
    // MIDI notes comming from Ableton Live. In this live-set configuration new screens are triggered with the 5th octave, particularlye by the C5 MIDI note
    if (note == "C5") {
      this.createScreen();
    }
  }

}

//=====================================================
// Execution
//=====================================================

function mouseClicked(){
  createScreen();
}

//=====================================================
// New-Screen Object
//=====================================================

function rectScreen(rectWidth, rectHeight, deltaTono, countTono, sat, brig){
  this.time = 0;
  this.x = 0;
  this.y = 0;
  this.width = rectWidth;
  this.height = rectHeight;
  this.tono = color(deltaTono*countTono,sat, brig);

  this.update = function(){
    fill(this.tono);
    rect(-this.width + this.x, 0, this.width, this.height);
    this.move();
    // this.killRect
  }

  this.move = function(){
    this.time++;
    if(this.time <= 60){
        this.x = map(this.time, 0, 60, 0, this.width);
    }
  }

  // this.killRect = function(){
  //
  // }

}

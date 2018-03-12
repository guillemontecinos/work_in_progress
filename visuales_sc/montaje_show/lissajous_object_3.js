// visuals prototype for Sector Coordillera
// by Guillermo Montecinos
// inspiredin Lissajous functions
// four scenes:
// A: curve's color is controlled by the mouse
// B: curve's color is controlled by the microfone
// C: curve's color changes automated with a sin function
// D: curve's color is controlled by 'X', and responses like a drum kick via MIDI

//=====================================================
// Lissajous Instance
//=====================================================
function lissajousObject(){
  // variables
  // Lissajous curve parameters
  this.radInit = height/2;
  this.rad = this.radInit;
  this.a = 10;
  this.b = 0;
  this.tailLengh = 15; //can be controlled externally
  this.alpha;
  this.saturation = 1;
  this.tail = [];
  this.aux = [];
  // environment parameters
  this.backAlpha = .05; //TODO: can be controlled from an external platform
  this.mode = 1; //1: lissajous almost continuous mode; 2: weird lissajous
  this.scene = 'A'; //controlled with the keyboard using letter S (sound)
  // mic caption and filtering variables
  this.mic; // mic object for mic control
  this.micAnterior = 0;
  this.micFiltered = 0;
  this.alphaGain = 0.4; //TODO: reactivate
  // MIDI triggering
  this.triggered = false;
  this.startTime = 0;
  this.gain = 1;

  // methods
  this.setupLissajous = function(){
    this.alpha = HALF_PI/this.tailLengh;
    //mic control initialization
    this.mic = new p5.AudioIn()
    this.mic.start(); //TODO: reactivate
    // tail vectors initialization
    for (var i = 0; i < this.tailLengh; i++) {
      this.tail[i] = createVector(this.rad,0); //intialize in x = rad
      this.aux[i] = createVector(this.rad,0); //intialize in x = rad
    }
    // color model
    colorMode(HSB,1);
  }

  this.drawLissajous = function(){
    // environment
    background('rgba(0,0,0,'+this.backAlpha+')');
    this.backAlpha = .05;
    // update tail
    this.updateTail();
    // writeLissajous parameters
    this.writeLissajous();
  }

  this.readKeyPressed = function(tecla){
    // lissajous parameters control
    if (tecla == 'I' || tecla == 'i') {
      this.a++;
    }
    else if (tecla == 'M' || tecla == 'm') {
      this.a--;
    }
    else if (tecla == 'J' || tecla == 'j') {
      this.b--;
    }
    else if (tecla == 'L' || tecla == 'l') {
      this.b++;
    }
    // lissajous model control
    else if (tecla === '1') {
    this.mode = 1;
    }
    else if (tecla === '2') {
    this.mode = 2;
    }
    // scene control
    else if (tecla === 'A' || tecla === 'a') {
      this.scene = 'A';
    }
    else if (tecla === 'B' || tecla === 'b') {
      this.scene = 'B';
    }
    else if (tecla === 'C' || tecla === 'c') {
      this.scene = 'C';
    }
    else if (tecla === 'D' || tecla === 'd') {
      this.scene = 'D';
    }
    else if (tecla === 'Q' || tecla === 'q') {
      this.scene = 'Q';
    }
    else if (tecla === 'X' || tecla === 'x') { //triggers kick
      this.triggerKick(1);
    }
  }

  this.updateTail = function(){
    push();
    // lissajous parameters. integers are modified in keyPressed()
    // positions
    translate(width/2,height/2);
    // shift
    for (var i = 0; i < this.tail.length; i++) {
      this.aux[i] = this.tail[i].copy();
    }
    if (this.mode == 1) {
      this.tail[0].x = this.rad*cos(this.a*millis()/800);
      this.tail[0].y = this.rad*sin(this.b*millis()/800);
    }
    else if (this.mode == 2) {
      this.tail[0].x = this.rad*cos(this.a*frameCount*this.alpha);
      this.tail[0].y = this.rad*sin(this.b*frameCount*this.alpha);
    }
    for (var i = 0; i < this.tail.length-1; i++) {
      this.tail[i+1] = this.aux[i].copy();
    }
    // drawing dots
    strokeWeight(5);
    // color setting, three scenes
    if (this.scene == 'A') { // A: curve's color is controlled by the mouse
      stroke(mouseX/width,this.saturation,1);
    }
    else if(this.scene == 'B') { // B: curve's color is controlled by the microfone
      stroke(0,0,this.setColorSceneB());
    }
    else if(this.scene == 'C') { // C: curve's color changes automated with a sin function
      stroke(map(sin(millis()/1000),-1,1,0,1),this.saturation,1);
    }
    else if(this.scene == 'D') { // D: curve's color is controlled by space bar, and responses like a drum kick
      this.backAlpha = .2;
      stroke(mouseX/width,this.saturation,this.expRamp(80,100,this.gain));
    }
    else if(this.scene == 'Q') { // Q: No visualization
      // TODO: make a scene with no visualization
      this.backAlpha = 1;
    }
    // lines drawing
    for (var i = 0; i < this.tail.length-1; i++) {
      line(this.tail[i].x, this.tail[i].y, this.tail[i+1].x, this.tail[i+1].y);
    }
    pop();
  }

  // setting brightness of the curve's stroke using mic
  this.setColorSceneB = function(){
    this.micFiltered = this.alphaGain*abs(this.mic.getLevel())+(1-this.alphaGain)*this.micAnterior;
    this.micAnterior = this.micFiltered;
    return this.micFiltered;
  }

  // exponential ramp to trigger kicks
  this.expRamp = function(timeUp, timeDown, A){
    if(this.triggered == true){
    	var x = 0;
    	if (millis() - this.startTime <= timeUp) {
    		x = A * (exp(map(millis() - this.startTime, 0, timeUp, 0, 0.71)) - 1);
    	}
    	else if (millis() - this.startTime > timeUp && millis() - this.startTime <= timeUp + this.timeDown) {
    		x = A - A * (millis() - this.startTime)/(timeUp+timeDown);
    	}
    	else if(millis() - this.startTime > timeUp + timeDown){
    		x = 0;
        this.triggered = false;
    	}
    	return x;
    }
  }

  this.triggerKick = function(A){
    this.gain = A;
    this.triggered = true;
    this.startTime = millis();
  }

  this.writeLissajous = function(){
    textSize(20);
    text('a: ' + this.a, 10, height - 80);
    fill(255);
    text('b: ' + this.b, 10, height - 60);
    fill(255);
    text('mode: ' + this.mode, 10, height - 40);
    fill(255);
    text('scene: ' + this.scene, 10, height - 20);
    fill(255);
  }

  this.reActivateLissajous = function(){
    // color mode
    colorMode(HSB,1);
    this.a = 10;
    this.b = 0;
    this.mode = 1;
  }

  this.setParam = function(note, velocity){
    // note in format G1, C0, ie, note + scale
    // velocity goes from 0 to 127
    // Nota: En Ableton Live las notas están 2 octavas más arriba
    // scene: C2, velocity: 0 -> A; 20 -> B; 40 -> C; 60 -> D; 80 -> Q. hay que multiplicar por 127 el valor recibido
    if (note == "C2" && velocity*127 == 1) {
      this.scene = 'A';
    }
    else if (note == "C2" && velocity*127 == 20) {
      this.scene = 'B';
    }
    else if (note == "C2" && velocity*127 == 40) {
      this.scene = 'C';
    }
    else if (note == "C2" && velocity*127 == 60) {
      this.scene = 'D';
    }
    else if (note == "C2" && velocity*127 == 80) {
      this.scene = 'Q';
    }
    // mode: D2, velocity: 0 -> '1'; 127 -> '2'
    if (note == "D2" && velocity*127 == 1) {
      this.mode = 1;
    }
    else if (note == "D2" && velocity*127 == 127) {
      this.mode = 2;
    }
    // set param a
    if (note == "E2") {
      this.a = velocity*127;
    }
    // set param b
    if (note == "F2") {
      this.b = velocity*127;
    }
    // set rad
    if (note == "G2") {
      this.rad = this.radInit*map(velocity*127,0,127,0,3);
    }
    // Setear tinte
    if (note == "A2") {
      this.saturation = map(velocity*127,1,127,0,1);
    }
  }
}

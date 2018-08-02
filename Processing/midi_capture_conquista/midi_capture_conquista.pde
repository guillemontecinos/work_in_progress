// SimpleMidi.pde

import themidibus.*; //Import the library
import javax.sound.midi.MidiMessage; 

MidiBus myBus; 

boolean prendido = false;

void setup() {
  size(480, 320);
  MidiBus.list(); 
  myBus = new MidiBus(this, 1, 2); 
}

void draw() {
  //background(currentColor);
  //myBus.sendNoteOn(channel, pitch, velocity); // Send a Midi noteOn
  ledBlink();
}

void ledBlink(){
  if(prendido == true){
    myBus.sendNoteOn(1,81,127);
  }
  else{
    myBus.sendNoteOff(1,81,127);
  }
}

void noteOn(int channel, int pitch, int velocity) {
  // Receive a noteOn
  println();
  println("Note On:");
  println("--------");
  println("Channel:"+channel);
  println("Pitch:"+pitch);
  println("Velocity:"+velocity);
  if (pitch == 81 ) {
   prendido = !prendido;
  }
}
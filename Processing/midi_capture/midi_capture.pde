// SimpleMidi.pde

import themidibus.*; //Import the library
import javax.sound.midi.MidiMessage; 

MidiBus myBus; 

int currentColor = 0;
int midiDevice  = 3;

void setup() {
  size(480, 320);
  MidiBus.list(); 
  myBus = new MidiBus(this, 0, 1); 
}

void draw() {
  background(currentColor);
}

void midiMessage(MidiMessage message, long timestamp, String bus_name) { 
  int note = (int)(message.getMessage()[1] & 0xFF) ;
  int vel = (int)(message.getMessage()[2] & 0xFF);

  println("Bus " + bus_name + ": Note "+ note + ", vel " + vel);
  if (vel > 0 ) {
   currentColor = 255*note/127;
  }
}
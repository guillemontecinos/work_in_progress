// Enable WebMidi.js
WebMidi.enable(function (err) {

  if (err) {
    console.log("WebMidi could not be enabled.", err);
  }

  // Viewing available inputs and outputs
  console.log(WebMidi.inputs);
  console.log(WebMidi.outputs);

  // Display the current time
  console.log(WebMidi.time);

  // Retrieving an output port/device using its id, name or index
  //var output = WebMidi.getOutputById("-1397140043");
  //output = WebMidi.getOutputByName("auxVirtualPort Bus 1");
  //output = WebMidi.outputs[0];

  // Play a note on all channels of the selected output
  //output.playNote("C3");

  // Play a note on channel 3
  //output.playNote("Gb4", 3);

  // Play a chord on all available channels
  //output.playNote(["C3", "D#3", "G3"]);

  // Play a chord on channel 7
  //output.playNote(["C3", "D#3", "G3"], 7);

  // Play a note at full velocity on all channels)
  //output.playNote("F#-1", "all", {velocity: 1});

  // Play a note on channel 16 in 2 seconds (relative time)
  //output.playNote("F5", 16, {time: "+2000"});

  // Play a note on channel 1 at an absolute time in the future
  //output.playNote("F5", 16, {time: WebMidi.time + 3000});

  // Play a note for a duration of 2 seconds (will send a note off message in 2 seconds). Also use
  // a low attack velocity
  //output.playNote("Gb2", 10, {duration: 2000, velocity: 0.25});

  // Stop a playing note on all channels
  //output.stopNote("C3");

  // Stopping a playing note on channel 11
  //output.stopNote("F3", 11);

  // Stop a playing note on channel 11 and use a high release velocity
  //output.stopNote("G8", 11, {velocity: 0.9});

  // Stopping a playing note in 2.5 seconds
  //output.stopNote("Bb2", 11, {time: "+2500"});

  // Send polyphonic aftertouch message to channel 8
  //output.sendKeyAftertouch("C#3", 8, 0.25);

  // Send pitch bend (between -1 and 1) to channel 12
  //output.sendPitchBend(-1, 12);

  // You can chain most method calls
  //output.playNote("G5", 12)
  //  .sendPitchBend(-0.5, 12, {time: 400}) // After 400 ms.
  //  .sendPitchBend(0.5, 12, {time: 800})  // After 800 ms.
  //  .stopNote("G5", 12, {time: 1200});    // After 1.2 s.


  // Retrieve an input by name, id or index
  var input = WebMidi.getInputByName("auxVirtualPort Bus 1");
  //input = WebMidi.getInputById("-1397140043");
  input = WebMidi.inputs[0];

  // Listen for a 'note on' message on all channels
  input.addListener('noteon', "all",
    function (e) {

      console.log("Received 'noteon' message (" + e.note.name + e.note.octave + ").");
    }
  );
  /*
  // Listen to pitch bend message on channel 3
  input.addListener('pitchbend', 3,
    function (e) {
      console.log("Received 'pitchbend' message.", e);
    }
  );

  // Listen to control change message on all channels
  input.addListener('controlchange', "all",
    function (e) {
      console.log("Received 'controlchange' message.", e);
    }
  );

  // Check for the presence of an event listener (n such cases, you cannot use anonymous functions).
  function test(e) { console.log(e); }
  input.addListener('programchange', 12, test);
  console.log("Has event listener: ", input.hasListener('programchange', 12, test));

  // Remove a specific listener
  input.removeListener('programchange', 12, test);
  console.log("Has event listener: ", input.hasListener('programchange', 12, test));

  // Remove all listeners of a specific type on a specific channel
  input.removeListener('noteoff', 12);

  // Remove all listeners for 'noteoff' on all channels
  input.removeListener('noteoff');

  // Remove all listeners on the input
  input.removeListener();
  */
});

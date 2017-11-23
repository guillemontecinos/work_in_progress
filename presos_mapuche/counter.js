//Huelga de Hambre Mapuche
//This scrip's aim is to display how many days Mapuche persons have been in feed strike
//Developed by: Unknonw

var today = new Date();
var justNow = 0;
var dateFrom = 0;
var deltaMilisec = 0;
var deltaMonth = 0;
var deltaWeeks = 0;
var deltaDays = 0;
var deltaHours = 0;
var deltaWeeks = 0;

dateFrom = Date.parse("June 6, 2017");
//p5.js sketch

function setup(){
  createCanvas(1000,1000);
  textFont("Arial");
}

function draw(){
  justNow = today.getTime();


  deltaMilisec = parseInt((justNow - dateFrom),0); ///(24*60*60*1000)
  deltaHours = deltaMilisec/(1000*60*60)
  deltaDays = deltaHours/24;
  deltaWeeks = deltaDays/7;
  deltaMonth = deltaWeeks/4;

  background(255);
  textSize(32);
  text("Los presos Mapuche han estado en Huelga de Hambre por: ",0,50);
  textSize(64);

  text(deltaHours.toFixed(1),0,150);
  text(" horas.", 200, 150);
  text(deltaDays.toFixed(1),0,200);
  text(" d"+String.fromCharCode(237)+"as.", 200, 200);
  text(deltaWeeks.toFixed(1),0,250);
  text(" semanas.", 200, 250);
  text(deltaMonth.toFixed(1),0,300);
  text(" meses.", 200, 300);
}


/*
justNow = today.getTime();
deltaMilisec = parseInt((justNow - dateFrom),0); ///(24*60*60*1000)
deltaHours = deltaMilisec/(1000*60*60)
deltaDays = deltaHours/24;
deltaWeeks = deltaDays/7;
deltaMonth = deltaWeeks/4;

var str = "Los presos Mapuche han estado en Huelga de Hambre por: ";
str.fontsize(64);

//document.write("Los presos Mapuche han estado en Huelga de Hambre por: ");
document.write(str);
//document.write(deltaDays.toFixed(1) +" d\&#237;as");
*/

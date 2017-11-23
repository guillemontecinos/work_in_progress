var radio = 50;

function setup(){
  createCanvas(800,500);
}

function draw(){
  push();
  translate(width/2,height/2);
  //rotate(PI*11/10);
  //PI(1/2-2/5) = PI((5-4)/10)
  beginShape();
  /*
  for (var i = 0; i < 3; i++) {
    var angulo = PI*11/10+i*2*PI/5;
    vertex(this.radio*cos(angulo),this.radio*sin(angulo));
  }
  */
  vertex(this.radio*cos(PI*11/10),this.radio*sin(PI*11/10));
  vertex(this.radio*cos(PI*11/10+2*PI/5),this.radio*sin(PI*11/10+2*PI/5));
  vertex(this.radio*cos(PI*11/10+4*PI/5),this.radio*sin(PI*11/10+4*PI/5));
  //bezierVertex(this.radio*cos(PI*11/10+2*PI/5),this.radio*sin(PI*11/10+2*PI/5),this.radio*cos(PI*11/10+4*PI/5),this.radio*sin(PI*11/10+4*PI/5),this.radio*cos(3*PI/2),this.radio*sin(3*PI/2));
  //endShape();
  endShape(CLOSE);
  pop();
}

//objeto parche
function Parche(radio,colorSelector){
  this.radio = radio;
  this.colorSelector = colorSelector;
  this.color;

  //selector de color
  this.colorSelect = function(){
    if (this.colorSelector==true) {
      this.color=0;
    }
    else {
      this.color=255;
    }
  }

  //funcion dibujar
  this.display = function(){
    //seleccionamos el color
    this.colorSelect();
    //pintamos el parche
    fill(this.color);
    push();
    beginShape();
    vertex(this.radio*cos(PI*11/10),this.radio*sin(PI*11/10));
    vertex(this.radio*cos(PI*11/10+2*PI/5),this.radio*sin(PI*11/10+2*PI/5));
    vertex(this.radio*cos(PI*11/10+4*PI/5),this.radio*sin(PI*11/10+4*PI/5));
    endShape(CLOSE);
    pop();
  }
}

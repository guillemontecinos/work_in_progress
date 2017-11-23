//Objeto pentágono
//creado para el logo de LPDF
//Guillermo Montecinos
//22/07/2017
var rombo = new Pentagono(50,0);

function setup(){
  createCanvas(800,500);
}
function draw(){
  background(255);
  rombo.display();
}

function Pentagono(radio,colorSelector){
  this.radio = radio;
  this.colorSelector = colorSelector;//1=blanco,0=negro
  this.color = 0;

  //selector de color
  this.colorSelect = function(){
    if (this.colorSelector==0) {
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
    //generamos forma
    push();
    fill(this.color);
    translate(width/2,height/2);
    //rotate(PI*11/10);
    //PI(1/2-2/5) = PI((5-4)/10)
    beginShape();
    for (var i = 0; i < 5; i++) {
      var angulo = PI*11/10+i*2*PI/5;
      print(angulo);
      vertex(this.radio*cos(angulo),this.radio*sin(angulo));
    }
    endShape(CLOSE);
    pop();
  }
}

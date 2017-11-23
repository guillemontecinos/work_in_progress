var parches = [];
//var parche;

function setup(){
  createCanvas(800,500);
  for (var i = 0; i < 5; i++) {
    parches[i] = new Parche(150/2.5,true);
  }
  //parche = new Parche(150/2.5,true);
}

function draw(){
  translate(width/2,height/2);
  for (var i = 0; i < 5; i++) {
    push();
    translate(100*cos(PI*8/5+i*2*PI/5),100*sin(PI*8/5+i*2*PI/5));
    //11/10+1/2=16/10=8/5
    rotate(PI*11/10+i*2*PI/5);
    parches[i].display();
    pop();
  }
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

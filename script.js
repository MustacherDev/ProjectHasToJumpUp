



function Ball(x, y){
  this.x = x;
  this.y = y;

  this.dx = 5;
  this.dy = -5;

  this.ballRadius = 10;

  this.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
  }

  this.update = function (platformList) {
    // Verifica se a bola atingiu as paredes do canvas
    if (this.x + this.dx > canvas.width - this.ballRadius || this.x + this.dx < this.ballRadius) {
      this.dx = -this.dx; // Inverte a direção horizontal
    }
    if (this.y + this.dy > canvas.height - this.ballRadius || this.y + this.dy < this.ballRadius) {
      this.dy = -this.dy; // Inverte a direção vertical
    }


    for(var i = 0; i < platformList.length; i++){
      var plataforma = platformList[i];
      // Verifica colisão Horizontal com a plataforma
      if (this.y + this.dy > plataforma.y - this.ballRadius && this.y + this.dy < plataforma.y + plataforma.height + this.ballRadius) {
          if (this.x > plataforma.x && this.x < plataforma.x + plataforma.width) {
            this.dy = -this.dy;
            this.dx += plataforma.dx/10;
          }
      }

      // Verifica colisão Vertical com a plataforma
      if (this.x + this.dx > plataforma.x - this.ballRadius && this.x + this.dx < plataforma.x + plataforma.width + this.ballRadius) {
          if (this.y > plataforma.y && this.y < plataforma.y + plataforma.height) {
            this.dx = -this.dx;
          }
      }
    }

    this.x += this.dx;
    this.y += this.dy;
  }
}

function Plataforma (x,y){
  this.x = x;
  this.y = y;
  this.dx = 3;
  this.width = 100;
  this.height = 15;
  this.dir = 0;

  this.draw = function(){
    ctx.fillStyle = '#000000';
    ctx.fillRect(this.x,this.y,this.width,this.height);
  }

  this.update = function () {

    if (!(this.x + this.dx*this.dir > canvas.width - this.width || this.x + this.dx*this.dir < 0)) {
       this.x += this.dir*this.dx;
    }

  }

}

var mofo = new Mofo(canvas.width/2, canvas.height/2, '#0095DD');
var rectangle = new Plataforma((canvas.width -100)/2,canvas.height -100);
var rectangle2 = new Plataforma((canvas.width -100)/2, 100);
var ball = new Ball(canvas.width/2,canvas.height -100);




function step(){
  // Fundo Branco
  ctx.fillStyle = 'white';
  ctx.fillRect(0,0, canvas.width, canvas.height);

  input.update();

  mofo.x = ball.x;
  mofo.y = ball.y;
  mofo.update();
  mofo.draw();


  rectangle.dir = 0;
  if(input.keyState[KeyCodes.KeyA][0]){
    rectangle.dir = -1;
  } else if(input.keyState[KeyCodes.KeyD][0]){
    rectangle.dir = 1;
  }

  rectangle2.dir = 0;
  if(input.keyState[KeyCodes.ArrowLeft][0]){
    rectangle2.dir = -1;
  } else if(input.keyState[KeyCodes.ArrowRight][0]){
    rectangle2.dir = 1;
  }





  rectangle.update();
  rectangle.draw();
  rectangle2.update();
  rectangle2.draw();


  ball.update([rectangle, rectangle2]);
  ball.draw();



  requestAnimationFrame(step)
}

step();

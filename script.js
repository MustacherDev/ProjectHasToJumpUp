var canvas = document.getElementById('Canvas');
var ctx = canvas.getContext('2d');



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

  this.update = function (plataforma) {
    // Verifica se a bola atingiu as paredes do canvas
    if (this.x + this.dx > canvas.width - this.ballRadius || this.x + this.dx < this.ballRadius) {
      this.dx = -this.dx; // Inverte a direção horizontal
    }
    if (this.y + this.dy > canvas.height - this.ballRadius || this.y + this.dy < this.ballRadius) {
      this.dy = -this.dy; // Inverte a direção vertical
    }

    if (this.y + this.dy > plataforma.y - this.ballRadius && this.y + this.dy < plataforma.y + plataforma.height + this.ballRadius) {
      // Verifica colisão com a plataforma
        if (this.x > plataforma.x && this.x < plataforma.x + plataforma.width) {
          this.dy = -this.dy;
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

  this.draw = function(){
    ctx.fillStyle = '#000000';
    ctx.fillRect(this.x,this.y,this.width,this.height);
  }

  this.update = function () {
    if (this.x + this.dx > canvas.width - this.width || this.x + this.dx < 0) {
      this.dx = -this.dx; // Inverte a direção horizontal
    }

    this.x += this.dx;
  }

}

var mofo = new Mofo(canvas.width/2, canvas.height/2);
var rectangle = new Plataforma ((canvas.width -100)/2,canvas.height -50);
var ball = new Ball(canvas.width/2,canvas.height -100);

function step(){
  // Fundo Branco
  ctx.fillStyle = 'white';
  ctx.fillRect(0,0, canvas.width, canvas.height);

  rectangle.update();
  rectangle.draw();

  ball.update(rectangle);
  ball.draw();

  requestAnimationFrame(step)
}

step();

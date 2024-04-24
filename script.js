var canvas = document.getElementById('Canvas');
var ctx = canvas.getContext('2d');


var largura = 10;
var ang = 0;
var mofo = new Mofo(canvas.width/2, canvas.height/2);

function ball(){
        
        this.x = canvas.width / 2;
        this.y = canvas.height - 30;
        this.dx = 5;
        this.dy = -5;
        this.ballRadius = 10;

        this.drawBall = function () {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2);
            ctx.fillStyle = '#0095DD';
            ctx.fill();
            ctx.closePath();
        }

        this.draw = function (plataforma) {
            this.drawBall();

            // Verifica se a bola atingiu as paredes do canvas
            if (this.x + this.dx > canvas.width - this.ballRadius || this.x + this.dx < this.ballRadius) {
              this.dx = -this.dx; // Inverte a direção horizontal
            }
            if (this.y + this.dy > canvas.height - this.ballRadius || this.y + this.dy < this.ballRadius) {
              this.dy = -this.dy; // Inverte a direção vertical
            }
            else if (this.y + this.dy > canvas.height - this.ballRadius) {
              // Verifica colisão com a plataforma
                if (this.x > plataforma.x && this.x < plataforma.x + plataforma.width) {
                  this.dy = -this.dy;
                }
            }
            this.x += this.dx;
            this.y += this.dy;
        }
      }
function plataforma (x,y){
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
  var rectangle = new plataforma ((canvas.width -100)/2,canvas.height -50);
  var ball = new ball();

function step(){

  // Fundo Branco
  ctx.fillStyle = 'white';
  ctx.fillRect(0,0, canvas.width, canvas.height);

  rectangle.update();
  rectangle.draw();
  ball.draw(rectangle);
  requestAnimationFrame(step)
}

step();

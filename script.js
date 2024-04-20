var canvas = document.getElementById('Canvas');
var ctx = canvas.getContext('2d');

var largura = 10;
var ang = 0;

function step(){
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0, 800, 600);



    ctx.fillStyle = 'lightblue';
    ctx.fillRect(400 + 200*Math.sin(ang), 50, largura, 100);
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 5;
    ctx.strokeRect(50, 50, largura, 100);
    ctx.font = '20px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('Canvas Example', 50, 30);
	
    largura++;
	ang+= 0.05;

    requestAnimationFrame(step)
}

step();
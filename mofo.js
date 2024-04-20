// Mofo
function Mofo(x, y){
  this.x = x;
  this.y = y;
  this.rastro = [];
  this.rastroMax = 2000;
  this.stepSize = 4;
  this.mofoSize = 3;

  // Mosca
  this.update = function(){
    this.x += Math.random()*this.stepSize*2 -this.stepSize;
    this.y += Math.random()*this.stepSize*2 -this.stepSize;

    this.rastro.push(this.x);
    this.rastro.push(this.y);

    if(this.rastro.length > this.rastroMax){
      this.rastro.shift();
      this.rastro.shift();
    }
  }

  this.draw = function(){
    for(var i = 0; i < this.rastro.length/2; i++){
      var color = 255*(1 - (i/(this.rastro.length/2)));
      ctx.fillStyle = "rgb(" + color + ", " + color + ", " + color + ")";
      ctx.fillRect(this.rastro[i*2], this.rastro[1+ i*2], this.mofoSize, this.mofoSize);
    }
  }
}

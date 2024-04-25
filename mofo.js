// Mofo

hexToRGB = function(hex){
  var bigint = parseInt(hex.substring(1), 16);
  var red = (bigint >> 16) & 255;
  var green = (bigint >> 8) & 255;
  var blue = bigint & 255;
  return [red, green, blue];
}

function Mofo(x, y, hexColor){
  this.x = x;
  this.y = y;
  this.rastro = [];
  this.rastroMax = 2000;
  this.stepSize = 4;
  this.mofoSize = 3;
  this.color = hexToRGB(hexColor);

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
      var alpha = i/(this.rastro.length/2);

      ctx.fillStyle = "rgba(" + this.color[0] + ", " + this.color[1] + ", " + this.color[2] + ", " + alpha + ")";
      ctx.fillRect(this.rastro[i*2], this.rastro[1+ i*2], this.mofoSize, this.mofoSize);
    }
  }
}

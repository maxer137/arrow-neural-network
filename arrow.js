function Arrow(x, y, r, v) {

  this.x = x;
  this.y = y;
  this.v = v;
  this.r = r;
  this.xforce = cos(this.r) * this.v;
  this.yforce = sin(this.r) * this.v;
  arrowimg = loadImage("images/arrow.png");

  this.show = function() {
    push();
    angleMode(DEGREES);
    translate(this.x, this.y);
    rotate(this.r);
    //console.log(tan(this.xforce / this.yforce))
    this.yforce += 0.06;
    fill(200, 200, 200);
    imageMode(CORNER)
    image(arrowimg, 0, 0, 30, 10);
    pop();
    this.r = atan2(this.yforce, this.xforce);
    this.x += this.xforce * 4;
    this.y += this.yforce * 4;
  }
}

function Arrow(x, y, r, v, c) {

  this.x = x;
  this.y = y;
  this.v = v;
  this.r = r;
  this.xforce = cos(this.r) * this.v;
  this.yforce = sin(this.r) * this.v;
  this.color = c;

  this.update = function() {
    this.r = atan2(this.yforce, this.xforce);
    this.x += this.xforce * 4;
    this.y += this.yforce * 4;
    this.yforce += 0.06;
  }

  this.show = function() {
    push();
    angleMode(DEGREES);
    translate(this.x, this.y);
    rotate(this.r);
    //console.log(tan(this.xforce / this.yforce))
    fill(200, 200, 200);
    imageMode(CORNER)
    fill(this.color)
    noStroke();
    rect(0, 0, 40, 5)
    pop();
  }
}

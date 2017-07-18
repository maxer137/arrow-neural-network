function bow(x, y) {

  this.x = x;
  this.y = y;
  this.rot = 0;
  bowimg = loadImage("images/costume1.png");

  this.show = function() {
    push();
    angleMode(DEGREES);
    translate(this.x, this.y);
    rotate(this.rot);
    imageMode(CENTER);
    image(bowimg, 0, 0);
    pop();
    this.rot = atan2(type[1].output[0] - this.y, type[1].output[1] - this.x);
  }
}

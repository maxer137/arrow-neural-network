function Target() {
  this.x = random(200, 500);
  this.y = random(200, 300);
  targetimg = loadImage("images/target.png");

  this.show = function() {
    imageMode(CENTER)
    image(targetimg, this.x, this.y, 25, 25);
  }

  this.change = function() {
    this.x = random(200, 440);
    this.y = random(100, 450);
  }
}

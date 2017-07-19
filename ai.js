function AI(c, genes) {

  this.input = [];
  this.hidden = [];
  this.output = [];
  this.wages = [];
  this.color;
  this.fitness;
  //----if there are wages given it takes those. If not it creates new genes----\\
  if (genes) {
    this.wages = genes;
  } else {
    for (var i = 0; i < 12; i++) {
      this.wages.push(random(0, 2))
    }
  }
  //----generates the color if there is none given----\\
  if (c) {
    this.color = c;
  } else {
    this.color = color(random(255), random(255), random(255));
  }
  this.input.push(target.x);
  this.input.push(target.y);

  //----calculates the output via a 2 to 3 to 2 neural network----\\
  this.shoot = function() {
    this.input[0] = target.x;
    this.input[1] = target.y;

    this.hidden[0] = ((this.input[0] * this.wages[0]) + (this.input[1] * this.wages[1])) / 2;
    this.hidden[1] = ((this.input[0] * this.wages[2]) + (this.input[1] * this.wages[3])) / 2;
    this.hidden[2] = ((this.input[0] * this.wages[4]) + (this.input[1] * this.wages[5])) / 2;

    this.output[0] = (this.hidden[0] * this.wages[6]) + (this.hidden[1] * this.wages[7]) + (this.hidden[2] * this.wages[8]) / 3;
    this.output[1] = (this.hidden[0] * this.wages[9]) + (this.hidden[1] * this.wages[10]) + (this.hidden[2] * this.wages[11]) / 3;

  }
  //---mutation program----\\
  this.mutation = function() {
    for (var i = 0; i < this.wages.length; i++) {
      if (random(1) < 0.01) {
        this.wages[i] += random(-0.05, 0.05);
      }
    }
  }
}

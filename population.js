function Population() {

  this.crossover = function(partnerA, partnerB, Ca, Cb) {
    var newgenes = [];
    var color;
    var mid = floor(random(partnerA.length));
    for (var i = 0; i < partnerA.length; i++) {
      if (i > mid) {
        newgenes[i] = partnerA[i];
        color = lerpColor(Ca, Cb, .0833 * i);
      } else {
        newgenes[i] = partnerB[i];
      }
    }
    return new AI(color, newgenes);
  }

  this.selection = function() {
    for (var i = 0; i < popsize.value(); i++) {
      var partnerA = random(nextgen);
      var partnerB = random(nextgen);
      var child = this.crossover(partnerA.wages, partnerB.wages, partnerA.color, partnerB.color);
      child.mutation();
      newgen[i] = child;
    }
  }
}

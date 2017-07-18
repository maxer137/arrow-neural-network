function Population() {

  this.crossover = function(partnerA, partnerB){
    var newgenes = [];
    var mid = floor(random(partnerA.length));
    for (var i = 0; i < partnerA.length; i++) {
      if(i > mid) {
        newgenes[i] = partnerA[i];
      } else {
        newgenes[i] = partnerB[i];
      }
    }
    return new AI(newgenes);
  }

  this.selection = function(){
    for (var i = 0; i < 100; i++) {
      var partnerA = random(nextgen);
      var partnerB = random(nextgen);
      var child = this.crossover(partnerA.wages, partnerB.wages);
      child.mutation();
      newgen[i] = child;
    }
  }
}

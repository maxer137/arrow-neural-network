var bestnumb;
var bow;
var best = 999;
var population = 100;
var popsize;
var tcount = 0; //counter for when to change targets position
var count = 0;
var kill = 0;
var ps = 20;
var hs = 0;
var nextgen = []; //array for nets next generation breeding
var newgen = []; //array with children of older generation
var arrows = []; //array for display arrows
var type = []; //array for the nets
var fit = []; //array for fitness values

function setup() {
  createCanvas(600, 450);
  createP('population size');
  popsize = createSlider(10, 200, 50);

  bow = new bow(50, 300);
  target = new Target();
  population = new Population();
  for (var i = 0; i < popsize.value(); i++) {
    fit.push(999);
    type[i] = new AI();
  }
  for (var i = 0; i < type.length; i++) {
    type[i].shoot();
    var arrow = new Arrow(bow.x, bow.y, atan2(type[i].output[0] - 300, type[i].output[1] - 50), 3, type[i].color);
    arrows.push(arrow);
  }
}

function draw() {
  background(51);
  target.show();
  //----puts fitness in a array----\\
  if (arrows.length > 0) {
    for (var i = arrows.length - 1; i >= 0; i--) {
      if (dist(arrows[i].x, arrows[i].y, target.x, target.y) < fit[i]) {
        fit[i] = dist(arrows[i].x, arrows[i].y, target.x, target.y);
      }
      arrows[i].show();
    }
  }
  count++;
  //----makes the new generation----\\
  if (count > 200) {
    arrows = [];
    for (var i = 0; i < fit.length / 4; i++) {
      for (var j = 0; j < fit.length; j++) {
        if (fit[j] < best) {
          best = fit[j];
          bestnumb = j;
        }
      }
      nextgen = [];
      for (var i = 0; i < fit.length; i++) {
        var n = 200 / fit[i];
        for (var j = 0; j < n; j++) {
          nextgen.push(type[i])
        }
      }
      nextgen[i] = type[bestnumb];
      type.splice(type[bestnumb], 1);
    }
    tcount++;
    fit = [];
    for (var i = 0; i < popsize.value(); i++) {
      fit.push(999);
    }
    //----changes target position----\\
    if (tcount > 5) {
      target.change();
      tcount = 0;
    }
    population.selection();
    type = newgen;
    for (var i = 0; i < type.length; i++) {
      type[i].shoot();
      var arrow = new Arrow(bow.x, bow.y, atan2(type[i].output[0] - 300, type[i].output[1] - 50), 3, type[i].color);
      arrows.push(arrow);
    }
    count = 0;
  }
  bow.show();
  fill(255);
}

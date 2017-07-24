var bestnumb;
var bow;
var speed;
var tcount = 0;   //counter for when to change targets position
var best = 999;
var count = 0;
var done = 0;
var kill = 0;
var hit = 0;
var gen = 1;
var ps = 20;
var hs = 0;
var nextgen = []; //array for nets next generation breeding
var newgen = [];  //array with children of older generation
var arrows = [];  //array for display arrows
var type = [];    //array for the nets
var fit = [];     //array for fitness values

function setup() {
  createCanvas(600, 450);
  createP('population size');
  popsize = createSlider(10, 200, 50);  //population size
  createP('mutation rate');
  mRate = createSlider(0, 200, 10);    //mutation rate
  createP('speed');
  speed = createSlider(1, 10, 1);
  createP('link to github page&nbsp;<a href="https://github.com/maxer137/arrow-neural-network/">here');
  population = new Population();
  bow = new bow(50, 300);
  target = new Target();
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
      for (var j = 0; j < speed.value(); j++) {
        if (dist(arrows[i].x, arrows[i].y, target.x, target.y) < fit[i]) {
          fit[i] = dist(arrows[i].x, arrows[i].y, target.x, target.y);
          if (fit[i] < 12.5) {
            fit[i] /= 10;
            hit++;
          }
        }
        if (fit[i] > 12.5) {
          arrows[i].update();
        }
      }
      arrows[i].show();
    }
  }
  count++;
  //----makes the new generation----\\
  for (var i = 0; i < type.length; i++) {
    if (arrows[i].x < 0 || arrows[i].x > 600 || arrows[i].y < 0 || arrows[i].y > 450 || fit[i] < 12.5) {
      done++;
    }
  }
  if (done > type.length - 1) {
    gen++;
    hit = 0;
    arrows = [];
    for (var i = 0; i < fit.length / 4; i++) {
      for (var j = 0; j < popsize.value(); j++) {
        if (fit[j] < best) {
          best = fit[j];
          if (fit < 12.5) {
            fit[j] = 1;
          }
          bestnumb = j;
        }
      }
      nextgen = [];
      for (var i = 0; i < fit.length; i++) {
        var n = 5000 / fit[i];
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
    if (tcount > 1) {
      tcount = 0;
      target.change();
    }
    population.selection();
    type = newgen;
    newgen = [];
    arrows = [];
    nextgen = [];
    for (var i = 0; i < type.length; i++) {
      type[i].shoot();
      var arrow = new Arrow(bow.x, bow.y, atan2(type[i].output[0] - 300, type[i].output[1] - 50), 3, type[i].color);
      arrows.push(arrow);
    }
    done = 0;
    count = 0;

  }
  done = 0;
  text("generation:" + gen, 0, 450);
  bow.show();
  fill(255);
}

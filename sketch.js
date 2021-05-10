let ba = []; //this is the array which with small bubbles are created in
let sz = 40;//this is the size of the regulaly spawned bubbles 
let sz2 = 90; //size of the cyan bubbles 
let numB = 10; //amout of bubble put in the aray 
let intensity_slider;//silder which controles the speed
let value_text;
let value = 1;
let bubble_button;//makes new cyan bubbles
let color_button;//button that changes the cyan bubbles to red
let sec;//seconds 
let time_allowed = 8;//the total time where you can score points 
let total_score = 0;

class Bubble {
  constructor(xloc, yloc, colr, sze, xs, ys) {
    this.x = xloc;
    this.y = yloc;
    this.c = colr;
    this.s = sze;
    this.xspd = xs;
    this.yspd = ys;
    this.xdir = 1;
    this.ydir = 1;
  }
  display() {
    fill(this.c);
    ellipse(this.x, this.y, this.s, this.s);
  }

  move() {
    push();
    this.x += value * this.xdir * this.xspd;
    this.y += value * this.ydir * this.yspd;
    if (this.x + this.s / 2 > width || this.x - this.s / 2 < 0) {
      this.xdir *= -1;
    }
    if (this.y + this.s / 2 > height || this.y - this.s / 2 < 0) {
      this.ydir *= -1;
    }
    pop();
  }
}

function setup() {
  createCanvas(600, 400);
  intensity_slider = createSlider(1, 5, 1, 1);
  value = intensity_slider.value();
  value_text = createP("the intensity is: " + value);
  let p = createP(
    "Try to click on as many bubbles as you can before time runs out. If you pop all of the small ones click the New Bubble button to create more. Your score is Number of bubbles x the value of the slider."
  );
  bubble_button = createButton("New Bubble");
  bubble_button.mousePressed(createbubble);
  color_button = createButton("change big bubbles color");
  color_button.mousePressed(change_clr);

  for (let i = 0; i < numB; i++) {
    ba.push(
      new Bubble(
        random(sz / 2, width - sz / 2),
        random(sz / 2, height - sz / 2),
        randColor(),
        sz,
        random(value),
        random(value)
      )
    );
  }
}

function draw() {
  background(220);
  sec = (millis() / 1000) % 60;
  value = intensity_slider.value();
  value_text.html("the intensity is: " + nf(value, 1, 2));

  for (let i = 0; i < ba.length; i++) {
    ba[i].move();
    ba[i].display();
  }
  if (sec >= time_allowed) {
    fill(0);
    textSize(32);
    textAlign(CENTER);
    text("you scored " + total_score, width / 2, height / 2);
    noLoop();
  }
}

function randColor() {
  return color(random(255), random(255), random(255));
}

function createbubble() {
  ba.push(
    new Bubble(
      width / 2,
      height / 2,
      color("cyan"),
      sz2,
      random(value),
      random(value)
    )
  );
}

function mousePressed() {
  for (let i = ba.length - 1; i >= 0; i--) {
    let d = dist(mouseX, mouseY, ba[i].x, ba[i].y);
    if (d <= ba[i].s) {
      ba.splice(i, 1);
      total_score += value;
    }
  }
}

function change_clr() {
  for (let i = 0; i < ba.length; i++) {
    if (ba[i].s > sz) {
      ba[i].c = color("red");
    }
  }
}

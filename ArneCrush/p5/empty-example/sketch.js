function setup() {
  // put setup code here
  createCanvas(640, 480);
}

function draw() {
  // put drawing code here
  if (mouseIsPressed) {
  	fill(0);
  }
  else {
  	fill(rgb(50,150,140));
  }
  ellipse(mouseX, mouseY, 80, 80);
}
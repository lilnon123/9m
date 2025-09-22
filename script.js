let fArray = [];
let hatchSize = 100;
let hatchToggle = true;
let chatchSize = 100;
let bg;

function preload() {
  bg = loadImage('./image/91A3B33C-BA54-4F83-AA0E-B8FD7808B7D5.jpg');
}

function setup() {
  let h = max(windowWidth, 3 * windowHeight);
  let w = (h * bg.width) / bg.height;
  createCanvas(w, h);
  strokeWeight(0.8);

  initFocalPoints(1000);
  brightenImage(50); 
}

function draw() {
  if (hatchToggle) {
    for (let i = 0; i < 10; i++) {
      fArray.forEach(fp => circleHatch(fp.x, fp.y));
    }
    if (hatchSize > 5) hatchSize -= 0.5;
  }
}

function circleHatch(cx, cy) {
  let x = random(width);
  let y = random(height);
  let pixCol = bg.get(int(bg.width / (width / x)), int(bg.height / (height / y)));
  stroke(pixCol);

  let r = dist(cx, cy, x, y);
  let theta = atan2(y - cy, x - cx);
  let hs = min(200, chatchSize / 10);
  let d = random(PI / (hs + 10), PI / hs);
  noFill();

  arc(cx, cy, r * 2, r * 2, theta - d, theta + d);
  chatchSize += 0.05;
}

function mousePressed() {
  initFocalPoints(20);
  chatchSize = 1;
}

function keyPressed() {
  hatchToggle = !hatchToggle;
}

function initFocalPoints(numFocalPoints) {
  fArray = [];
  let spacingX = width / (numFocalPoints + 1);
  let spacingY = height / (numFocalPoints + 1);
  for (let i = 1; i <= numFocalPoints; i++) {
    fArray.push(createVector(i * spacingX, i * spacingY));
  }
}

function brightenImage(amount) {
  bg.loadPixels();
  for (let i = 0; i < bg.pixels.length; i += 4) {
    bg.pixels[i] = constrain(bg.pixels[i] + amount, 0, 255);
    bg.pixels[i + 1] = constrain(bg.pixels[i + 1] + amount, 0, 255);
    bg.pixels[i + 2] = constrain(bg.pixels[i + 2] + amount, 0, 255);
  }
  bg.updatePixels();
}

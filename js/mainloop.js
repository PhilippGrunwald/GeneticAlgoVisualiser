let canvas = document.querySelector(".canvas");
let canvasWrapper = document.querySelector(".canvas-wrapper");
let context = canvas.getContext("2d");
// let reset_buttom = document.querySelector("#reset-buttom");
let WIDTH = canvasWrapper.clientWidth;
let HEIGHT = canvasWrapper.clientHeight;

let elapsedTime; // timedifference between two frames
let oldTimeStamp = 0;
let fps;
let FIXED_FPS = 30;

// variables that are changed by buttons
let UPDATES_PER_FRAME = 1;
let POPULATION_SIZE = 20;
let MUTATION_RATE = 0.05;

// initialise Game Objects;
// popluation: size, x, y, radius, dna size
let population;
let target;
let walls;

window.onload = init;

function init() {
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  // mousehandeling
  canvas.onmousedown = canvas_onmousedown;
  canvas.onmouseup = canvas_onmouseup;
  canvas.onmousemove = canvas_onmousemove;
  // touchhandeling
  canvas.addEventListener("touchstart", canvas_touchdown);
  canvas.addEventListener("touchend", canvas_touchup);
  canvas.addEventListener("touchmove", canvas_touchmove);

  context.font = "25px Arial";
  menuInit();
  // reset_buttom.addEventListener('click', reset);
  reset();
  // window.requestAnimationFrame(gameLoop);
  setInterval(gameLoop, 1000 / FIXED_FPS);
}

function reset() {
  // game objects
  walls = new Walls(30);
  target = new Target((WIDTH * 3) / 4, HEIGHT / 8, HEIGHT / 10, "#61927A");
  population = new Population(
    POPULATION_SIZE, // size
    WIDTH / 4, // x
    (HEIGHT * 7) / 8, // y
    HEIGHT / 40, // radius
    FIXED_FPS * 6, // dna size
    target, // target
    MUTATION_RATE
  );
}

function gameLoop(timeStamp) {
  // calculate fps
  timeStamp = Date.now();
  elapsedTime = (timeStamp - oldTimeStamp) / 1000;
  oldTimeStamp = timeStamp;
  fps = Math.round(1 / elapsedTime);

  // fill screen;
  context.fillStyle = "#F4F1DE";
  context.fillRect(0, 0, WIDTH, HEIGHT);

  // display fps
  context.fillStyle = "black";
  context.fillText("FPS: " + fps, 10, 30);

  updateInputs(); // function in check_menu.js
  update();

  draw();
  handleEvents();

  // window.requestAnimationFrame(gameLoop);
}

function draw() {
  population.draw(context);
  target.draw(context);
  walls.draw(context);
}

function update() {
  population.updatePopSize(POPULATION_SIZE);
  for (let i = 0; i < UPDATES_PER_FRAME; i++) {
    population.update();
    population.checkCollision(walls);
  }
}

//
//
//
//
// event handling

let mouseDown = false;
let mouseX = 0;
let mouseY = 0;

function handleEvents() {
  if (mouseDown) {
    walls.addWall(mouseX, mouseY);
  }
}

function canvas_onmousedown(e) {
  mouseDown = true;
  getMousePos(e);
}

function canvas_onmouseup(e) {
  mouseDown = false;
}

function canvas_onmousemove(e) {
  getMousePos(e);
}

function getMousePos(e) {
  let rect = canvas.getBoundingClientRect();
  mouseX = ((e.clientX - rect.left) / (rect.right - rect.left)) * canvas.width;
  mouseY = ((e.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height;
}

function canvas_touchdown(e) {
  mouseDown = true;
  getMousePos(e.touches[0]);
}
function canvas_touchup(e) {
  mouseDown = false;
}
function canvas_touchmove(e) {
  getMousePos(e.touches[0]);
}

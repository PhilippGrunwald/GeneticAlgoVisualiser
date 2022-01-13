

let updatesPerFrameInput = document.querySelector("#updates-per-frame-input");
let populationSizeInput = document.querySelector("#population-size-input");

function menuInit() {
  updatesPerFrameInput.value = UPDATES_PER_FRAME.toString();
  populationSizeInput.value = POPULATION_SIZE.toString();
}


function updateInputs() {
  // update the updates per frame
  let upf = parseInt(updatesPerFrameInput.value, 10);
  if (upf === NaN) {
    upf = 0;
  }
  console.log(upf);
  UPDATES_PER_FRAME = upf;
  popS = parseInt(populationSizeInput.value, 10);
  if (popS === NaN) {
    popS = 50;
  }
  POPULATION_SIZE = popS;
}
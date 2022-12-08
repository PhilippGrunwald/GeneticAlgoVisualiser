let updatesPerFrameInput = document.querySelector("#speedMultiplier");
let populationSizeInput = document.querySelector("#populationSize");
let mutationRateInput = document.querySelector("#mutationRate");

function menuInit() {
  updatesPerFrameInput.value = UPDATES_PER_FRAME.toString();
  populationSizeInput.value = POPULATION_SIZE.toString();
  mutationRateInput.value = MUTATION_RATE.toString();
}

function updateInputs() {
  // update the updates per frame
  let upf = parseInt(updatesPerFrameInput.value, 10);
  if (upf === NaN) {
    upf = 0;
  }
  UPDATES_PER_FRAME = upf;
  popS = parseInt(populationSizeInput.value, 10);
  if (popS === NaN || popS <= 20) {
    popS = 20;
  }
  POPULATION_SIZE = popS;
}

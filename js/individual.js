class Individual {
  constructor(x, y, radius, dnaSize, target) {
    this.fitness = 0;
    this.target = target;
    this.alive = true;
    this.dnaSize = dnaSize;
    this.radius = radius;
    this.dnaPointer = 0;
    this.x = x;
    this.y = y;
    this.velocityX = 0;
    this.velocityY = 0;
    this.DNA = [];
    // add directions of acceleration
    for (let i = 0; i < this.dnaSize; i++) {
      this.DNA.push(this.generateRandomDnaSlot());
    }
    this.color = "#B04A2F";
  }

  generateRandomDnaSlot() {
    // Math.random() * (max - min) + min;
    let speedScaling = 1;
    let x =
      Math.random() * ((2 * speedScaling * WIDTH) / 1360) -
      (speedScaling * WIDTH) / 1360;
    let y =
      Math.random() * ((2 * speedScaling * HEIGHT) / 659) -
      (speedScaling * HEIGHT) / 659;
    return [x, y];
  }

  draw(context) {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    context.fill();
  }

  update() {
    // check collision
    this.checkCollision();
    if (!this.alive) {
      return;
    }
    this.velocityX += this.DNA[this.dnaPointer][0];
    this.velocityY += this.DNA[this.dnaPointer][1];
    this.x += this.velocityX;
    this.y += this.velocityY;
    this.dnaPointer++;
    if (this.dnaPointer >= this.dnaSize - 1) {
      this.alive = false;
      this.calculateFitness();
    }
  }

  kill() {
    this.calculateFitness();
    this.alive = false;
  }

  calculateFitness() {
    this.fitness = Math.sqrt(
      (this.x - this.target.x) ** 2 + (this.y - this.target.y) ** 2
    );
  }

  checkCollision() {
    // check if the individual is outside of the screen
    if (this.x <= 0 || this.y <= 0 || this.x >= WIDTH || this.y >= HEIGHT) {
      this.alive = false;
      this.calculateFitness();
    }
    // check if the individual is in the target
    this.calculateFitness();
    if (this.fitness <= this.target.radius) {
      this.alive = false;
      this.fitness = 0;
    }
  }

  crossOver(indi1, indi2) {
    // take randomly 50% of the dna from indi1 and 50% from indi2
    let child = new Individual(0, 0, 0, indi1.dnaSize, indi1.color); // cross over die color
    for (let i = 0; i < this.dnaSize; i++) {
      let r = Math.random();
      if (r > 0.5) {
        child.DNA[i] = indi1.DNA[i];
      } else {
        child.DNA[i] = indi2.DNA[i];
      }
    }
    // console.log(child);
    return child;
  }

  mutate(mutationRate) {
    for(let i = 0; i < this.dnaSize; i++) {
      if (Math.random() < mutationRate) {
        this.DNA[i] = this.generateRandomDnaSlot();
      }
    }
  }
}

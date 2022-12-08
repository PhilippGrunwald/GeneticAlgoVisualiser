class Population {
  constructor(
    popSize,
    indiX,
    indiY,
    indiRadius,
    indiDNASize,
    target,
    mutationRate
  ) {
    this.mutationRate = mutationRate;
    this.popSize = popSize;
    this.nextPopulationSize = popSize;
    this.indiX = indiX;
    this.indiY = indiY;
    this.indiRadius = indiRadius;
    this.indiDNASize = indiDNASize;
    this.target = target;
    this.popSize = popSize;
    this.individuals = [];
    for (let i = 0; i < this.popSize; i++) {
      this.individuals.push(
        new Individual(indiX, indiY, indiRadius, indiDNASize, target)
      );
    }
  }

  draw(context) {
    for (let i = 0; i < this.popSize; i++) {
      this.individuals[i].draw(context);
    }
  }

  update() {
    let populationDead = true;
    for (let i = 0; i < this.popSize; i++) {
      this.individuals[i].update();
      if (this.individuals[i].alive) {
        populationDead = false;
      }
    }
    if (populationDead) {
      this.generateNextGeneration(this.mutationRate);
    }
  }

  chooseParent() {
    // Roulette wheel selection (selection is proportional to its fitness)
    // get max score:
    let maxScore = 0;
    for (let i = 0; i < this.popSize; i++) {
      if (this.individuals[i].fitness >= maxScore) {
        maxScore = this.individuals[i].fitness;
      }
    }
    maxScore++;

    let sum = 0;
    for (let i = 0; i < this.popSize; i++) {
      sum += (maxScore - this.individuals[i].fitness) ** 3;
    }
    let rouletteThrow = Math.random() * sum;
    for (let i = 0; i < this.popSize; i++) {
      rouletteThrow += (maxScore - this.individuals[i].fitness) ** 3;
      if (rouletteThrow >= sum) {
        return this.individuals[i];
      }
    }
  }

  generateNextGeneration(mutationRate) {
    let newIndividuals = [];
    for (let i = 0; i < this.nextPopulationSize; i++) {
      let parent1 = this.chooseParent();
      let parent2 = this.chooseParent();
      let child = parent1.crossOver(parent1, parent2);
      // console.log(child);
      // console.log(child.DNA);
      child.x = this.indiX;
      child.y = this.indiY;
      child.radius = this.indiRadius;
      child.dnaSize = this.indiDNASize;
      child.target = this.target;
      child.fitness = 0;
      child.dnaPointer = 0;
      child.mutate(mutationRate);
      child.alive = true;
      newIndividuals.push(child);
    }
    this.individuals = newIndividuals;
    this.popSize = this.nextPopulationSize;
  }

  checkCollision(walls) {
    for (let individual of this.individuals) {
      walls.checkCollision(individual);
    }
  }

  updatePopSize(popSize) {
    if (popSize <= 20 || popSize == NaN) {
      popSize = 20;
    }
    this.nextPopulationSize = popSize;
  }
}

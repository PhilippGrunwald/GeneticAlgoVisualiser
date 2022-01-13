class Walls {
  constructor(amountOfSquares) {
    this.amountOfSquares = amountOfSquares;
    this.cellLength = Math.ceil(Math.max(WIDTH, HEIGHT) / this.amountOfSquares);
    this.amountX = Math.ceil(WIDTH / this.length);
    this.amountY = Math.ceil(HEIGHT / this.length);
    this.activeWalls = [];
    console.log(this.cellLength);
  }

  isActive(newWall) {
    let wallActive = false;
    for (let wall of this.activeWalls) {
      if (wall[0] === newWall[0] && wall[1] === newWall[1]) {
        wallActive = true;
      }
    }
    return wallActive;
  }

  addWall(x, y) {
    let gridCoordX = Math.floor(x / this.cellLength);
    let gridCoordY = Math.floor(y / this.cellLength);
    let newWall = [gridCoordX, gridCoordY];
    // check if the wall is already active:
    if (!this.isActive(newWall)) {
      this.activeWalls.push(newWall);
    }
  }

  draw(context) {
    context.fillStyle = '#3D405B';
    for (let wall of this.activeWalls) {
      context.fillRect(wall[0] * this.cellLength, wall[1] * this.cellLength, this.cellLength, this.cellLength);
      // context.fillRect(wall[0] * this.cellLength, wall[1] * this.cellLength, this.cellLength, 100);
     
    }
  }

  checkCollision(individual) {
    let gridCoordX = Math.floor(individual.x / this.cellLength);
    let gridCoordY = Math.floor(individual.y / this.cellLength);
    if (this.isActive([gridCoordX, gridCoordY])) {
      individual.kill();
    }
  }
}
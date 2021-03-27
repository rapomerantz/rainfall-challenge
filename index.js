const input1 = '3 1 5 2 2 4 7 3 6 9'
const input2 = '1 10'
const input3 = '5 1 0 2 5 8 2 3 4 7 9 3 5 7 8 9 1 2 5 4 3 3 3 5 2 1'
const input4 = '4 0 2 1 3 2 1 0 4 3 3 3 3 5 5 2 1'

class BasinFinderService {
  clearResults() {
    this.result = '';
    this.basins = {};
    this.matrix = [];
    this.matrixSize = null;
  }

  findBasins(inputString) {
    this.clearResults();

    const inputArray = inputString.split(' ');
    this.matrixSize = inputArray.shift();
    this.matrix = this.parseInputToMatrix(inputArray);
    this.processMatrix();
    this.buildResult();

    return this.result;
  }

  parseInputToMatrix(inputArray) {
    const matrix = [];
    for (let i = 0; i < this.matrixSize; i++) {
      matrix[i] = [];
      for (let j = 0; j < this.matrixSize; j++) {
        matrix[i].push(parseInt(inputArray.shift()));
      }
    }

    return matrix;
  }

  processMatrix() {
    for (let y = 0; y < this.matrixSize; y++) {
      for (let x = 0; x < this.matrixSize; x++) {
        this.recordNodeDestination(y, x);
      }
    }
  }

  recordNodeDestination(y, x) {
    let lowestCoordinates = [y, x];
    let lowestValue = this.matrix[y][x];
    //check left
    if (x - 1 >= 0 && this.matrix[y][x - 1] < lowestValue) {
      lowestCoordinates = [y, x - 1];
      lowestValue = this.matrix[y][x - 1];
    }
    //check right
    if (x + 1 <= this.matrixSize - 1 && this.matrix[y][x + 1] < lowestValue) {
      lowestCoordinates = [y, x + 1];
      lowestValue = this.matrix[y][x + 1];
    }
    //check up
    if (y - 1 >= 0 && this.matrix[y - 1][x] < lowestValue) {
      lowestCoordinates = [y - 1, x];
      lowestValue = this.matrix[y - 1][x];
    }
    //check down
    if (y + 1 <= this.matrixSize - 1 && this.matrix[y + 1][x] < lowestValue) {
      lowestCoordinates = [y + 1, x];
    }
    //else, i am lowest
    if (lowestCoordinates[0] === y && lowestCoordinates[1] === x) {
      //build key-value pair of sink & track squares that feed into it
      let basinKey = `${y}-${x}`;
      if (basinKey in this.basins) {
        this.basins[basinKey]++;
        return;
      }

      this.basins[basinKey] = 1;
      return;
    }

    this.recordNodeDestination(lowestCoordinates[0], lowestCoordinates[1]);
  }

  buildResult() {
    let resultAsArray = [];
    Object.keys(this.basins).forEach((key) => {
      resultAsArray.push(this.basins[key]);
    })

    resultAsArray.sort((a, b) => a - b).reverse();
    resultAsArray.forEach((resultItem) => {
      this.result = `${this.result} ${resultItem}`
    })
  }
}

const BasinFinder = new BasinFinderService();
const result1 = BasinFinder.findBasins(input1);
const result2 = BasinFinder.findBasins(input2);
const result3 = BasinFinder.findBasins(input3);
const result4 = BasinFinder.findBasins(input4);

console.log('RESULTS');
console.log('1 -- ', result1);
console.log('2 -- ', result2);
console.log('3 -- ', result3);
console.log('4 -- ', result4);
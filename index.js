const input1 = '3 1 5 2 2 4 7 3 6 9'
const input2 = '1 10'
const input3 = '5 1 0 2 5 8 2 3 4 7 9 3 5 7 8 9 1 2 5 4 3 3 3 5 2 1'
const input4 = '4 0 2 1 3 2 1 0 4 3 3 3 3 5 5 2 1'

class BasinFinderService {
  findBasins(input) {
    input = input.split(' ');
    this.matrixSize = input.shift();
    this.matrix = this.parseInputToMatrix(input);
    this.processMatrix();

    return this.buildResultString();
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

  //for each node, find its sink & record it as a destination in basins obj.
  processMatrix() {
    this.basins = {};

    for (let y = 0; y < this.matrixSize; y++) {
      for (let x = 0; x < this.matrixSize; x++) {
        this.findNodeDestination(y, x);
      }
    }
  }

  findNodeDestination(y, x) {
    //assume initial state is lowest
    let lowestCoordinates = [y, x];
    let lowestValue = this.matrix[y][x];

    //left
    if (x - 1 >= 0 && this.matrix[y][x - 1] < lowestValue) {
      lowestCoordinates = [y, x - 1];
      lowestValue = this.matrix[y][x - 1];
    }
    //right
    if (x + 1 <= this.matrixSize - 1 && this.matrix[y][x + 1] < lowestValue) {
      lowestCoordinates = [y, x + 1];
      lowestValue = this.matrix[y][x + 1];
    }
    //up
    if (y - 1 >= 0 && this.matrix[y - 1][x] < lowestValue) {
      lowestCoordinates = [y - 1, x];
      lowestValue = this.matrix[y - 1][x];
    }
    //down
    if (y + 1 <= this.matrixSize - 1 && this.matrix[y + 1][x] < lowestValue) {
      lowestCoordinates = [y + 1, x];
    }
    //else, i am lowest & should be recorded
    if (lowestCoordinates[0] === y && lowestCoordinates[1] === x) {
      this.recordDestination(y, x);
      return;
    }
    //else, recurse
    this.findNodeDestination(lowestCoordinates[0], lowestCoordinates[1]);
  }

  recordDestination(y, x) {
    let basinKey = `${y}-${x}`;
    if (basinKey in this.basins) {
      this.basins[basinKey]++;
    } else {
      this.basins[basinKey] = 1;
    }
  }

  buildResultString() {
    let basinValues = [];
    let resultString = '';
    Object.keys(this.basins).forEach((basinKey) => {
      basinValues.push(this.basins[basinKey]);
    })

    basinValues.sort((a, b) => a - b).reverse();
    basinValues.forEach((basinValue) => {
      resultString = `${resultString} ${basinValue}`
    })

    return resultString;
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
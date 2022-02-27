export class Matrix {
  constructor(inMatrix) {
    this.data = inMatrix;
  }

  // this is a getter now
  get(row, column) {
    // NOTE the cool range error
    if (row >= this.data.length) throw new RangeError('out of bounds');
    if (column >= this.data[row].length) throw new RangeError('out of bounds');

    return this.data[row][column];
  }

  set(row, column, value) {
    if (row >= this.data.length) throw new RangeError('out of bounds');
    if (column >= this.data[row].length) throw new RangeError('out of bounds');

    this.data[row][column] = value;
  }

  // now interesting part
  // we dont have to return an iterator with iterable because generators are iterators
  *[Symbol.iterator]() {
    let nextRow = 0;
    let nextCol = 0;

    // now because we can just implement a while loop to make sure things can be yielded
    while (nextRow !== this.data.length) {
      // we yield the value
      // but why do we have while loop? does this mean all of this will go run on its own?

      yield this.data[nextRow][nextCol];

      // now we prepare for the next iteration
      if (nextCol === this.data[nextRow].length - 1) {
        nextRow++;
        nextCol = 0;
      } else {
        nextCol++;
      }
    }
  }
}

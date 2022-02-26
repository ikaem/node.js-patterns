import { Readable } from 'stream';

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

  // now we implement the iterable protocol
  // this makes the class iterable
  // this is same as @@iterator () {...}
  [Symbol.iterator]() {
    let nextRow = 0;
    let nextCol = 0;

    return {
      next: () => {
        // fail fast
        if (nextRow === this.data.length) {
          // effectively we return done as soon as the next row value is same as our data lenght
          return { done: true };
        }

        // we just get the current value
        const currVal = this.data[nextRow][nextCol];

        // then we check if we need to move to the next row - if we are at the ent of a row
        // for this, we just check if the next column we want to iterator over actually exists
        if (nextCol === this.data[nextRow].length - 1) {
          nextRow++;
          nextCol = 0;
        } else {
          // otherwise, we just move to the next columnž
          nextCol++;
        }

        return {
          // and we return whatever is the value for current iteration
          value: currVal,
        };
      },
    };
  }
}

const matrix2x2 = new Matrix([
  ['11', '12'],
  ['21', '22'],
]);

for (const element of matrix2x2) {
  console.log(element);
  // element in this case is the value of the data itself, because that is the way we set up the iterator
  // 11;
  // 12;
  // 21;
  // 22;
}

const flattened = [...matrix2x2];
console.log(flattened);
// [ '11', '12', '21', '22' ]

const streamOfMatrix = Readable.from(matrix2x2);

streamOfMatrix.on('data', (chunk) => {
  console.log('chunk', chunk);

  /* 
chunk 11
chunk 12
chunk 21
chunk 22
  */
});

// note that we actually pass the symbol iterator thing
// it also calls the default iterator for an object
// const iterator = matrix2x2[Symbol.iterator]();

// let iterationResult = iterator.next();

// while (!iterationResult.done) {
//   console.log(iterationResult.value);
//   iterationResult = iterator.next();
// }

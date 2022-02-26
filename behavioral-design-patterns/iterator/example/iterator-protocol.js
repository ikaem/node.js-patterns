const A_CHAR_CODE = 65;
const Z_CHAR_CODE = 90;

function createAlphabetIterator() {
  // WE START WITH THIS
  let currCode = A_CHAR_CODE;

  // this complies with the interface of the iterator protocol
  return {
    next() {
      const currChar = String.fromCodePoint(currCode);

      if (currCode > Z_CHAR_CODE) {
        return {
          done: true,
        };
      }

      currCode++;
      return {
        value: currChar,
        done: false,
      };
    },
  };
}

const iterator = createAlphabetIterator();

let iterationResult = iterator.next();

while (!iterationResult.done) {
  /* TODO we can get the current value, too */
  console.log('current iteration result', iterationResult.value);

  // and then we just call next, to change the closed value inside the instance
  iterationResult = iterator.next();
}

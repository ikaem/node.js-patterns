import { asyncRoutine } from './asyncRoutine.js';
import { createAsyncCancelable } from './create-async-cancelable';
import { CancelError } from './cancelError.js';

const cancelable = createAsyncCancelable(function* () {
  const resA = yield asyncRoutine('A');
  console.log(resA);

  const resB = yield asyncRoutine('B');
  console.log(resB);

  const resC = yield asyncRoutine('C');
  console.log(resC);
});

// the promise has already started its thing - it is already getting data from the generator
const { promise, cancel } = cancelable();

promise.catch((err) => {
  if (err instanceof CancelError) {
    console.log('Function canceled');
  } else {
    console.error(err);
  }
});

// and now jsut simulate canceling
setTimeout(() => {
  cancel();
}, 100);

import { asyncRoutine } from './asyncRoutine.js';
import { CancelError } from './cancelError.js';

async function cancelable(cancelObj) {
  const resA = await asyncRoutine('A');
  console.log(resA);

  if (cancelObj.cancelRequest) throw new CancelError();

  const resB = await asyncRoutine('B');
  console.log(resB);

  if (cancelObj.cancelRequest) throw new CancelError();

  const resC = await asyncRoutine('C');
  console.log(resC);
}

// tis is the call

const cancelObj = {
  cancelRequest: false,
};

cancelable(cancelObj).catch((err) => {
  if (err instanceof CancelError) {
    console.log('Function canceled');
  } else {
    console.error(err);
  }
});

setTimeout(() => {
  cancelObj.cancelRequest = true;
}, 100);

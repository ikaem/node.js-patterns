import { asyncRoutine } from './asyncRoutine.js';
import { createCancelWrapper } from './cancelWrapper.js';
import { CancelError } from './cancelError.js';

// ok, this is now defining cancelable
// it kinda just calls its stuff
// and it does nto make much sense to be able to cancel it after stuff has been resolved?

async function cancelable(cancelWrapper) {
  const resA = await cancelWrapper(asyncRoutine, 'A');
  const resB = await cancelWrapper(asyncRoutine, 'B');
  const resC = await cancelWrapper(asyncRoutine, 'C');
}

const { cancelWrapper, cancel } = createCancelWrapper();

cancelable(cancelWrapper).catch((err) => {
  if (err instanceof CancelError) {
    // ...
  }
});

// and now we cancel again async
setTimeout(() => {
  cancel();
}, 100);

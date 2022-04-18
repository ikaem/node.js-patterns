import { CancelError } from './cancelError.js';

export function createAsyncCancelable(generatorFunction) {
  // this should be returned first from the above factory
  return function asyncCancelable(...args) {
    const generatorObject = generatorFunction(...args);
    let cancelRequested = false;

    function cancel() {
      cancelRequested = true;
    }

    // so this promise is returned from the asyncCancelable
    // so we call async cancelable, and we get this promise
    const promise = new Promise((resolve, reject) => {
      // now this is a lot of nesting here
      async function nextStep(prevResult) {
        if (cancelRequested) {
          return reject(new CancelError());
        }

        if (prevResult.done) {
          return resolve(prevResult.value);
        }

        // all good so far

        // here starts trouble

        try {
          // here we just call next step
          // what is returned?
          // next step wont return until it reaches the above conditions?
          // or is it taht we dont really need it to return?
          // we just need it to settle its promise?

          nextStep(generatorObject.next(await prevResult.value));
        } catch {
          try {
            // am i wrong, or do generator objects have these methods on them?
            nextStep(generatorObject.throw(err));
          } catch (err2) {
            reject(err2);
          }
        }
      }

      // this is to kickstart the execution of next step, to get to the promise vlaues
      nextStep({});
    });

    return { promise, cancel };
  };
}

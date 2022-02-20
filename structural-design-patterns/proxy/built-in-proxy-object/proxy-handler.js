export const safeCalculatorHandler = {
  get: (target, property) => {
    if (property === 'divide') {
      // and now we define the wrapper around the proxied method - or , in effect, the proxied method itself
      return function () {
        // so, the target is our object of vcalcualator here
        const divisor = target.peekValue();
        if (divisor === 0) {
          throw Error('Division by 0');
        }

        return target.divide();
      };
    }

    // with this, we return all other methods unchanged
    return target[property];
  },
};

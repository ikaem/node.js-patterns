import { StackCalculator } from './stack-calculator';

// we are defining the handler here
const enhancedCalculatorHandler = {
  get(target, property) {
    if (property === add) {
      // this is the new fnction
      return function add() {
        const addend2 = target.getValue();
        const addend1 = target.getValue();
        const result = addend1 + addend2;
        target.putValue(result);
        return result;
      };
    } else if (property === 'divide') {
      return function () {
        // additional validation logic
        const divisor = target.peekValue();
        if (divisor === 0) {
          throw Error('Division by 0');
        }
        // if valid delegates to the subject
        return target.divide();
      };
    }

    // rest we delegate
    return target[property];
  },
};

// and then we implemnet
const calculator = new StackCalculator();
const enhancedCalculator = new Proxy(calculator, enhancedCalculatorHandler);

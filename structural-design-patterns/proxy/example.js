export class StackCalculator {
  constructor() {
    this.stack = [];
  }

  putValue(value) {
    this.stack.push(value);
  }

  getValue() {
    return this.stack.pop();
  }

  peekValue() {
    return this.stack[this.stack.length - 1];
  }

  clear() {
    this.stack = [];
  }

  divide() {
    const divisor = this.getValue();
    const dividend = this.getValue();

    const result = dividend / divisor;
    this.putValue(result);

    return result;
  }

  multiply() {
    const multiplicand = this.getValue();
    const mutiplier = this.getValue();

    const result = mutiplier * multiplicand;
    this.putValue(result);

    return result;
  }
}

const calculator = new StackCalculator();

calculator.pushValue(3);
calculator.putValue(2);
console.log(calculator.multiply());

// this is class that creates a proxy object - important is that we create a proxy object, not a proxy class
class SafeCalculator {
  constructor(calculator) {
    this.calculator = calculator;
  }

  // this is a proxied mehtod
  divide() {
    // here we check for 0 being the last value
    const divisor = this.calculator.peekValue();

    if (divisor === 0) throw new Error('Division by 0!');

    return this.calculator.divide();
  }

  /* 
  
  // restt of the methods are here, and they call calculator's origin methods as they were
  */
}

function createSafeCalculator(calculator) {
  return {
    // this is the proxied mehtod
    divide() {
      const divisor = calculator.peekValue();

      if (divisor === 0) throw new Error('Division by 0!');
      return calculator.divide();
    },

    // rest of the methofs are same, call original calcualtor's methods
  };
}

const calculator = createSafeCalculator(new StackCalculator());

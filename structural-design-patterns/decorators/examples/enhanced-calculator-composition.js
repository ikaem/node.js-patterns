class EnhancedCalculator {
  constructor(calculator) {
    this.calculator = calculator;
  }

  // this now is a new method
  add() {
    const addend2 = this.getValue();
    const addend1 = this.getValue();
    const result = addend1 + addend2;
    // we do put it back because we want to be able to conitnue calculation
    this.putValue(result);
    return result;
  }

  // this is now validation for didvide
  divide() {
    const divisor = this.calculator.peekValue();
    if (divisor === 0) throw new Error('Division by 0!');

    return this.calculator.divide();
  }

  /* 
    rest of the methods are delegated
  
  */
}

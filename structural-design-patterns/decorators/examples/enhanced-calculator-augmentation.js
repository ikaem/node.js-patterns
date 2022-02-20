function patchCalculator(calculator) {
  // we add a new mehtod
  calculator.add = function () {
    const addend2 = calculator.getValue();
    const addend1 = calculator.getValue();
    const result = addend1 + addend2;
    // we do put it back because we want to be able to conitnue calculation
    calculator.putValue(result);
    return result;
  };

  const originalDivide = calculator.divide;
  calculator.divide = function () {
    const divisor = calculator.peekValue();
    if (divisor === 0) throw new Error('Division by 0!');

    // this is important - to make sure the divide is bound to the calculator
    return calculator.divide.apply(calculator);
  };

  return calculator;
}

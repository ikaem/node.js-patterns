function patchToSafeCalculator(calculator) {
  const divideOrig = calculator.divide;

  calculator.divide = () => {
    // so first we validate
    const divisor = calculator.peekValue();

    if (divisor === 0) throw Error('Division by 0');

    // and now if all good, we will just return the original function
    // but we have to bind it to the original calculator, because we use 'this' there, and we dont want its exectuion context to be bound to this function - we dont have the stack here
    // also, we use apply isntead of bind - we do it because we want to call the funciton immediately
    // we would use bind if we wanted to call the function later

    return divideOrig.apply(calculator);
  };

  return calculator;
}

function* twoWayGenerator() {
  try {
    // this will be assigned only on the following next() call, with that next()'s argument. However, yield null will be returned on the initial next() call
    const what = yield null;
    yield 'Hello ' + what;
  } catch (err) {
    yield 'Hello error: ' + err.message;
  }
}

console.log('Using throw()');
const twoWayException = twoWayGenerator();
twoWayException.next();
console.log(twoWayException.throw(new Error('Boom!')));

console.log('Using return()');
const twoWayReturn = twoWayGenerator();
twoWayReturn.next();
console.log(twoWayReturn.return('My return value'));

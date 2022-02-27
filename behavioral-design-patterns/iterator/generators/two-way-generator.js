function* twoWayGenerator() {
  // i guess we use null to have a default thing?
  // const what = yield null;
  console.log('logging initial');
  // so i guess first time we yield null
  // and we dont assign anything here until the next call
  const secondCallArg = yield null; //
  console.log('logging first call arg', { secondCallArg }); // for some reason, this is logging second call arg
  // then, we yield second time - and at this point call to next will be assign to secondCallarg
  // we yield, but nothing is assigned to thrid call arg
  const thirdCallArg = yield secondCallArg;
  console.log('logging second call arg', { thirdCallArg });
  // at this point, when we make next call third time, we assign up there value of third call to the third call arg
  // now we can yield back that thrid call arg
  // we dont assign value yet to fourht call arg - it is still pending, waiting for its value
  const fourthCallArg = yield thirdCallArg;
  console.log('logging fourth call arg', { fourthCallArg });
  // at this pint, wehn we make another yield, ayn possible foruth call arg wi assign to the foruth call arg, even if that was asisning to toe return of yeild of thridx yall
  yield secondCallArg;
}

const twoWay = twoWayGenerator();

console.log(twoWay.next('first call arg'));
console.log('////////////////');
console.log(twoWay.next('second call arg'));
console.log('////////////////');
console.log(twoWay.next('third call arg'));
console.log('////////////////');
console.log(twoWay.next('fourth call arg'));

/* 
logging initial
{ value: null, done: false }
////////////////
logging first call arg { secondCallArg: 'second call arg' }
{ value: 'second call arg', done: false }
////////////////
logging second call arg { thirdCallArg: 'third call arg' }
{ value: 'third call arg', done: false }
////////////////
logging fourth call arg { fourthCallArg: 'fourth call arg' }
{ value: 'second call arg', done: false }


*/

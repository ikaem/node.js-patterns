import { createProfiler } from './profiler.js';

function getAllFactors(intNumber) {
  console.log('process.env.NODE_ENV in get all factors', process.env.NODE_ENV);

  const profiler = createProfiler(`Finding all factors of ${intNumber}`);
  console.log('profiler', profiler);

  profiler.start();
  const factors = [];

  for (let factor = 2; factor <= intNumber; factor++) {
    console.log('intNumber', intNumber);

    // this is not correct
    // while (intNumber % factor === 0) {
    //   factors.push(factor);
    //   intNumber = intNumber / factor;
    // }

    if (intNumber % factor === 0) factors.push(factor);
  }

  profiler.end();

  return factors;
}

const myNumber = process.argv[2];
const myFactors = getAllFactors(myNumber);

console.log(`Factors of ${myNumber} are:`, myFactors);

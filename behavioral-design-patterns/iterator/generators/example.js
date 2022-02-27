function* myGenerator() {
  /* some code */
}

function* fruitGenerator() {
  yield 'peach'; // this is equal to done false, value peach
  yield 'watermelon'; // equal to done false, value watermelon
  return 'summer'; // equal to done true, value summer
}

// now we instantiate the fruit generator
// it returs an object that is both an iterable and an iterator
const fruitGeneratorObj = fruitGenerator();

// because this is an iterator, we can call next on it
// the generator does keep internal state - maybe something like closure? not sure really
console.log(fruitGeneratorObj.next()); // { value: 'peach', done: false }
console.log(fruitGeneratorObj.next()); // { value: 'watermelon', done: false }
console.log(fruitGeneratorObj.next()); // { value: 'summer', done: true }

// we are now iterating over a new object returned by the generator
// note that summer is not logged in
for (const fruit of fruitGenerator()) {
  console.log('fruit', fruit);
  /* 
  fruit peach
  fruit watermelon
  */
}

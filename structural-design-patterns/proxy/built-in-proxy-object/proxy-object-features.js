// checking even numbers
// check if a number is even
// check what is the nth even number in the object i guess, starting from 0 - or 2?

const evenNumbers = new Proxy([], {
  // index is bascually a property on the object
  // and if we pass an object to the object, we wont get the value that is actualyl on the object
  // we get some calculated value - because the empty array has no 7 index here, but we use proxy as if it did?
  get: (target, index) => index * 2,
  // here, we want to check if the target has this property maybe? but i guess we work around it - we dont check if it has it, we fake it as if it did have it
  has: (target, number) => number % 2 === 0,
});

// i guess this will call has
console.log(2 in evenNumbers); // true
console.log(5 in evenNumbers); // false

// and i guess this will get on the proxy handler
console.log(evenNumbers[7]); // 14

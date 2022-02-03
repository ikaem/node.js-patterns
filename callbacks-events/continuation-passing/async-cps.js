// async continuous passing style
function addAsyncCPS(a, b, cb) {
  // we pass result to callback, instead of returning it

  setTimeout(() => {
    cb(a + b);
  }, 100);
}

console.log('before');
addAsyncCPS(1, 2, (result) => console.log('this is result', result));
console.log('after');


/* 
before
after
this is result 3

*/
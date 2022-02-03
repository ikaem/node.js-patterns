promise.then(onFulfilled, onRejected);

asyncOperationWithCallbacks(arg, (err, result) => {
  if (err) {
    // handle error
  }
  // handle result
});

asyncOperationPromise(arg).then(
  (result) => {
    // result handle
  },
  (err) => {
    // error handle
  }
);


asyncOp1(org)
.then(res1 => {
  return asyncOp2(arg2)
})
.then(res2 => {
  return "done"
})
.then(undefined, err => {
  // this is where we catch porential errors 
})

new Promise((resolve, reject) => {})

Promise.resolve(obj)

Promise.reject(err)

Promise.all(["karlo", "ivan"])
Promise.allSettled(["karlo", "ivan"])

promise.then(onFulfilled, onRejected)
promise.catch(onRejected)
promise.finally(onFinally)
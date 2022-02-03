const me = new Promise((resolve) => resolve('karlo')).then(
  (successResult) => console.log(successResult),
  (rejectedResult) => console.log(rejectedResult)
);

const asyncIterator = iterable[Symbol.asyncIterator]();
let iterationResult = await asyncIterator.next();

while (!iterationResult.done) {
  // this is usual, no await of
  console.log(iterationResult.value);
  iterationResult = await asyncIterator.next();
}

function iterate(index) {
  // return if index of ran index is the same as the lenght of tasks
  if (index === tasks.length) {
    return finish();
  }

  // and then we get the task
  const task = tasks[index];
  task(() => iterate(index + 1));
}

function finish() {
  // completed iteration
}

iterate(0);

// more generalized solution

function iterateSeries(collection, iteratorCallback, finalCallback) {
  iteratorCallback(0, collection, finalCallback);
}

function iteratorCallback(index, collection, finalCallback) {
  if (index === collection.length) {
    return finalCallback;
  }

  const task = collection[index];
  task(() => iteratorCallback(index + 1));
}

iterateSeries(collection, iteratorCallback, finalCallback);

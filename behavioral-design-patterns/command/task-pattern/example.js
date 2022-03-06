function createTask(target, ...args) {
  return () => {
    target(...args);
  };
}

// above is mostly equal to this:
// why is it equal? bc we are createing a new funciton that does exact same thing as the original one
const task = target.bind(null, ...args);

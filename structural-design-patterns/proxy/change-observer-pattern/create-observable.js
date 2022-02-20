export function createObservable(target, observer) {
  const observable = new Proxy(target, {
    // we use set trap mehtod to intercept actions to set value
    set(obj, prop, value) {
      if (value !== obj[prop]) {
        const prev = obj[prop];
        obj[prop] = value;
        observer({ prop, prev, curr: value });
      }
      //  i guess set needs to return a boolean
      return true;
    },
  });

  return observable;
}

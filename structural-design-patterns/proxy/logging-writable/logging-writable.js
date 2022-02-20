export function createLoggingsWritable(writable) {
  return new Proxy(writable, {
    // this now is the proxy handler
    // what is this receiver thing?
    // it seems to be the proxy object itself
    get(target, propKey, receiver) {
      console.log('this is receiver', receiver);

      if (propKey === 'write') {
        // so how we pass to our function all arguemntsthat write would normally get
        return function (...args) {
          // we extract the chunk from the args
          const [chunk] = args;

          console.log('Writing chunk');

          // could we have returned target.write?
          return writable.write(...args);
        };
      }

      return target[propKey];
    },
  });
}

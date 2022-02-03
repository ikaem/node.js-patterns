import { readFile } from 'fs';

const cache = new Map()

function consistentReadAsync(filename, callback) {
  if(cache.has(filename)) {
    // now this is deferred callback invocation 
    // the callback is passed to nextTick, which will push its own callabck to the top of the evnet queue
    process.nextTick(() => callback(cache.get(filename)))
  } else {
    // this is now classic async function 
    readFile(filename, "utf", (err, data) => {
      cache.set(filename, data)
      callback(data)
    })
  }
}
import { read, readFile } from 'fs';

const cache = new Map();

function inconsistentRead(filename, cb) {
  if (cache.has(filename)) {
    // this is now sync
    console.log('has cache');
    cb(cache.get(filename));
  } else {
    // this is now async
    console.log('has not cache');
    readFile(filename, 'utf-8', (err, data) => {
      console.log('inside read file success');
      cache.set(filename, data);
      console.log('this is cache inside callback', cache);
      cb(data);
    });
  }
}

// function that uses the above function
function createFileReader(filename) {
  const listeners = [];

  // the value will be passed inside the defintion of incostendRead - that is how we defiend it
  inconsistentRead(filename, (value) => {
    // so bascially we call every listener in the array, and pass it the same value
    listeners.forEach((listener) => listener(value));
  });

  // then we return form the cuntion

  return {
    // i guess this is called frin the variable that gets assinge
    onDataReady: (listener) => listeners.push(listener),
    // TODO just testing
    listeners,
  };
}

// // nwo use the createfilereader
// const reader1 = createFileReader("data.txt"); // this is first object // this is behaving asyncrnously
// console.log(reader1) // here listeners is empty
// // becuase the above is async, any on data ready listener will be invoked in another cycle of the event loop
// // data here from the listners for each
// reader1.onDataReady((data) => console.log("this is first call", data)) // this actually logs stuff
// console.log(reader1) // here listeners is not empty

// // second call
// console.log("SECOND CALL!!!")
// // nwo use the createfilereader
// const reader2 = createFileReader("data.txt"); // this is first object // this is behaving asyncrnously
// console.log(reader2) // here listeners is empty
// // becuase the above is async, any on data ready listener will be invoked in another cycle of the event loop
// // data here from the listners for each
// reader2.onDataReady((data) => console.log("this is second call", data)) // this actually logs stuff
// console.log(reader2) // here listeners is not empty

// console.log("this is cache", cache)

const reader1 = createFileReader('data.txt');
console.log(reader1);
reader1.onDataReady((data) => {
  console.log('this is first call', data);

  // 
  const reader2 = createFileReader("data.txt")
  reader2.onDataReady((data) => {
    console.log("this is the second call", data)
  })
});

// here we get only the first log 

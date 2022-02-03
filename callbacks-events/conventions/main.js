// readFile(filename, [options], callback)

// import { readFile } from 'fs';

// const me = readFile("test", () => {
//   console.log("something")
// })


// const test = (url, callback) => {
//   callback(url)

// }

// test("try", (value) => console.log(value) )

const customRead = (path, encoding, callback) => {
  console.log("fetching something with path", path)
  const thisIsResult = "result"
  const thisIsError = new Error("this is error")

  callback(thisIsError, thisIsResult)
}

// customRead("path", "encoding", (err, data) => {
//   // this will be true - the error
//   if(err) {
//     console.log("we have an error", err)
//   } else {
//     // this will not happen
//     console.log("can set some state, for instance", data)
//   }
// })

// propagating errors
// this callback should only accept error and do soemthing with it
const readJSONCustom = (filename, callback) => {

  customRead("path", "encoding", (err, data) => {
    // custom read will do its job now
    // but here we are in the callback

    let parsed

    if(err) {
      /* here we will propagate error to the next callback */
      // we we return from the callback now
      return callback(err)
    }

    try {
      // now we parse and check if error 
      parsed = JSON.parse(data)
    } catch(err) {
    
      // again, we eeturn and pass the erorr to the callback
      return callback(err)
    }

    // here all is good
    callback(null, parsed)

  })

}

readJSONCustom("path-again", (err, data = null) => {
  if(err) {
    console.error("this is error in the top-most callback", err)
  } else {
    console.log("we managed to get the data", data)
  }
})

/* 
fetching something with path path
this is error in the top-most callback Error: this is error
    at customRead (file:///home/karlo/development/ja/node.js-patterns/callbacks-events/conventions/main.js:20:23)
    at readJSONCustom (file:///home/karlo/development/ja/node.js-patterns/callbacks-events/conventions/main.js:39:3)
    at file:///home/karlo/development/ja/node.js-patterns/callbacks-events/conventions/main.js:67:1
    at ModuleJob.run (node:internal/modules/esm/module_job:185:25)
    at async Promise.all (index 0)

*/
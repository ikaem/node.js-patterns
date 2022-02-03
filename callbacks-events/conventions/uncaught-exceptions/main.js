import { readFile } from 'fs';

function readJSONThrows(filename, callback) {
  readFile(filename, (err, data) => {
    if (err) {
      return callback(err);
    }

    // alternative here
    // let parsed;
    // try {
    //   parsed = JSON.parse(data);
    // } catch (e) {
    //   return callback(e);
    // }

    callback(null, JSON.parse(data));
    // callback(null, parsed);
  });
}

readJSONThrows('./invalid_json.json', (err, data) => {
  if (err) {
    console.error('test err', err);
    return;
  }

  // this is in hope that data is parsed well
  console.log(data);
});

// nicely caught error
/* 
    callback(null, JSON.parse(data))


*/

/* 
SyntaxError: Unexpected token c in JSON at position 0
    at JSON.parse (<anonymous>)
    at file:///home/karlo/development/ja/node.js-patterns/callbacks-events/conventions/uncaught-exceptions/main.js:9:25
    at FSReqCallback.readFileAfterClose [as oncomplete] (node:internal/fs/read_file_context:68:3)


*/

// this does not work iether, as try catch, and the error will traver up the call stack in which the error was thrown - in the event loop - we are in event loop there
// it is not in the function that triggered the async operation
// not at lease when e jsut do try to pass the error in the callback

// try {
//   readJSONThrows('invalid_json.json', (err) => console.log('error', err));
// } catch (e) {
//   console.log('this does not catch the JSON.parse error');
// }


process.on("uncaughtException", err => {
  console.error("This will catch the JSON parsing exception - the uncaught exception:", err.message)

  // also, do terminate the app , so it does not leak
  process.exit(1)
  /* 
  This will catch the JSON parsing exception - the uncaught exception: Unexpected token c in JSON at position 0
  
  */
})
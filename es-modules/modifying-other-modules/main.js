// main.js

import fs from 'fs';
import { mockDisable, mockEnable } from './mock-read-file.js';
import { createRequire } from 'module';

const require = createRequire(import.meta.url)
const data = require("./data.json")

console.log({data})
/* 
{ data: { test: 'test' } }
*/

// import data from './data.json'; // this is error

mockEnable(Buffer.from('Hello World'));

// this now is a call to the mock ready file
fs.readFile('fake-path', (err, data) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  // we can do this, because we passed that buffer, and error is null
  console.log(data.toString());
});

// and now we disable the mock
mockDisable();

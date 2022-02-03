// es-modules/modifying-other-modules/mock-read-file.js

import fs from "fs"

// i guess we jsut save reference to the origin function
const originalReadFile = fs.readFile
// we also set placeholdre for some mocked respokse valurable 
let mockedResponse = null;


// then we create a functon that will return our mock

function mockedReadFile(path, cb) {
  setImmediate(() => {
    // this null is error argument
    cb(null, mockedResponse)
  })
}

// now we set a way to enable mocking 
// we also have argument here that will be responsed with in the mock
export function mockEnable(respondWith) {
  mockedResponse = respondWith;
  // now, when fs ready file is called, respondWith will have its value in the mock
  fs.readFile = mockedReadFile
}

export function mockDisable() {
  fs.readFile = originalReadFile
}
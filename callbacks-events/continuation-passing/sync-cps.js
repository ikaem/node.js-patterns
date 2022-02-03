// direct style
function add (a, b) {
  return a + b
}

// continuous passing style 
function addCPS(a,b,cb) {
  // we pass result to callback, instead of returning it
  cb(a+b)
}

console.log("before")
addCPS(1,2,(result) => console.log("this is result", result))
console.log("after")

/* 
before
this is result 3
after

*/
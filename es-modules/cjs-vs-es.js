// this is possible with common js

let module = null;

if(true) {
  module = require("some-module")
} else {
  module = require("other-module")
}


// this is not possible with es modules 

if(true) {
  import module1 from "module1"
} else {
  import module2 from "modules2"
}
// es-modules/read-only-live-bindings/main.js

import {count, increment} from "./counter.js"

console.log({count}) // 0
increment() // this works 
console.log({count}) // 1

count++ // cannot assing to constant
function loadModule(filename, module, require) {
  const wrappedSrc = `
    (function(module, exports, require) {
      ${fs.readFileSync(filename, "utf-8")}
    })(module, module.exports, require)  
  `

  eval(wrappedSrc)
}

// /* this is now the require function that uses the load module thing  */

function require(moduleName) {
  console.log(`Require invoked for module: ${moduleName}`)
  const id = require.resolve(moduleName)

  if(require.cache[id]) {
    return require.cache[id].exports
  }

  // he we specify metadata 
  const module = {
    exports: {},
    id
  }

  // update the cache
  require.cache[id] = module

  // load the module - where - into that module thing
  // why do we use require in the load module thing 
  loadModule(id, module, require)

  // retrn exported variables 
  return module.exports
}
// this is just attaching property to the functon 
require.cache = {}
require.resolve = (moduleName) => {
  // this is just to get id, or filename
}


// THIS IS NOW LIKE RTEQUIRING A MODULE 
const dependcy = require("./someModule");

// this now is a provate function
function log() {
  console.lg(`This is now imported - ${dependcy}`)
}

// and i guess we use this to export the log somehow 

module.exports.run = () => {
  log()
}

// this is wrong 
exports = () => console.log("hello")

// this is reasinging module.exports itself 
module.exports = () => console.log("test")
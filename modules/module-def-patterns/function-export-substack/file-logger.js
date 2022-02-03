// modules/module-def-patterns/function-export-substack/file-logger.js

module.exports = (message) => console.log(`info - ${message}`)
module.exports.verbose = (message) => console.log(`verbose - ${message}`)
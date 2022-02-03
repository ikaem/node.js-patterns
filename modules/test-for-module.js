const fs = require("fs")

console.log(require.cache)

/* 
[Object: null prototype] {
  '/home/karlo/development/ja/node.js-patterns/modules/test-for-module.js': Module {
    id: '.',
    path: '/home/karlo/development/ja/node.js-patterns/modules',
    exports: {},
    filename: '/home/karlo/development/ja/node.js-patterns/modules/test-for-module.js',
    loaded: false,
    children: [],
    paths: [
      '/home/karlo/development/ja/node.js-patterns/modules/node_modules',
      '/home/karlo/development/ja/node.js-patterns/node_modules',
      '/home/karlo/development/ja/node_modules',
      '/home/karlo/development/node_modules',
      '/home/karlo/node_modules',
      '/home/node_modules',
      '/node_modules'
    ]
  }
}

*/
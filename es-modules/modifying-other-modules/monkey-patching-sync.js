import fs, { readFileSync } from 'fs';
import { syncBuiltinESMExports } from 'module';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url)

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log({ url: import.meta.url, __filename, __dirname });

/* 
{
  url: 'file:///home/karlo/development/ja/node.js-patterns/es-modules/modifying-other-modules/monkey-patching-sync.js',
  __filename: '/home/karlo/development/ja/node.js-patterns/es-modules/modifying-other-modules/monkey-patching-sync.js',
  __dirname: '/home/karlo/development/ja/node.js-patterns/es-modules/modifying-other-modules'
}

*/

fs.readFileSync = () => console.log('test');

// this will map al lfrom default exports into equavalintely named named exports
syncBuiltinESMExports();

// this is just a test now
console.log(fs.readFileSync === readFileSync); // this should be true

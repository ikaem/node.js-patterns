import { createWriteStream } from 'fs';
import { createLoggingsWritable } from './logging-writable.js';

const writable = createWriteStream('test.txt');
// and now we pass it to our proxy
const writableProxy = createLoggingsWritable(writable);

// and now we write

// it is not needed to pass argument, is it
// this is name of the file
writable.write('test');

// this is now logged
writableProxy.write('this is logged');
// we do have tio end it?
writableProxy.end();

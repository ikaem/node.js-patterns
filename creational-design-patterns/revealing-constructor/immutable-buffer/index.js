import { ImmutableBuffer } from './immutable-buffer.js';

const hello = 'hello';

// this is ok to spread write, because we have it passed via modifier object to the executor
const immutable = new ImmutableBuffer(hello.length, ({ write }) => {
  write(hello);
});

// so here we are reading from 0 offset
console.log(String.fromCharCode(immutable.readInt8(0)));

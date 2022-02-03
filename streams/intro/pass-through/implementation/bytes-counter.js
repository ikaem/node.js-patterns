import { createReadStream, createWriteStream } from 'fs';
import { PassThrough } from 'stream';
import { createGzip } from 'zlib';

let bytesWritten = 0;
const monitor = new PassThrough();
monitor.on('data', (chunk) => {
  bytesWritten += chunk.length;
});

monitor.on('finish', () => {
  console.log(`${bytesWritten} bytes written`);
});

monitor.write('Hello');
monitor.end();

/* this is a real life example */
createReadStream(filename)
  .pipe(createGzip)
  .pipe(monitor)
  .pipe(createWriteStream(`${filename}.gz`));

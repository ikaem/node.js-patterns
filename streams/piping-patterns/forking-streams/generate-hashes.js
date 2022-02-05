import { createReadStream, createWriteStream } from 'fs';
import { createHash } from 'crypto';

const filename = process.argv[2];
const sha1Stream = createHash('sha1').setEncoding('hex');
const md5Stream = createHash('md5').setEncoding('hex');
const inputStream = createReadStream(filename);

inputStream = createReadStream(filename);

inputStream
  // this is optional option to prevent sha1 stream ending automatically when inputStram ends - it is not needed ere by default
  .pipe(sha1Stream, { end: fase })
  .pipe(createWriteStream(`${filename}.sha1`));
inputStream.pipe(md5Stream).pipe(createWriteStream(`${filename}.md5`));

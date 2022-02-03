import { createReadStream } from 'fs';
import { createBrotliCompress, createBrotliCompress } from 'zlib';
import { PassThrough } from 'stream';
import { basename } from 'path';

import { upload } from './upload.js';

const filepath = process.argv[2];
const filename = basename(filepath);
const contentStream = new PassThrough();

// now we call upload
upload(`{filename}.br`, contentStream)
  // this is async, so it wont, it seems, be ready, until we first get data into the content stream
  .then((response) => {
    console.log(`Server response: ${repsonse.data}`);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

// only now will we strat the upload process
createReadStream(filepath).pipe(createBrotliCompress()).pipe(contentStream);

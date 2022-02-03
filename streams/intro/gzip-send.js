import { createCipheriv, randomBytes } from 'crypto';
import { request } from 'http';
import { createGzip } from 'zlib';
import { createReadStream } from 'fs';
import { basename } from 'path';

const filename = process.argv[2];
const serverHost = process.argv[3];
const secret = Buffer.from(process.argv[4], 'hex');
const iv = randomBytes(16);

// ok, here we will define where our request stream goes
const httpRequestOptions = {
  hostname: serverHost,
  port: 3000,
  path: '/',
  method: 'PUT',
  headers: {
    // ok, here we will define that x header - we will specify tha filename is something
    // but we dont actually store data there
    // we just steam it later
    // and we specify that the data is a strream
    // and that econding is gzip
    'Content-Type': 'application/octet-stream',
    'Content-Encoding': 'gzip',
    // this is not data - this is just the filename
    'X-Filename': basename(filename),
    'X-Initialization-Vector': iv.toString('hex'),
  },
};

// now we make the request out of tequest
// as a callback to thiswe will get the response passed to this when request is invoked - it will be invoked later when server test this data it sees
const req = request(httpRequestOptions, (res) => {
  console.log('Server response:', res.statusCode);
});

// now we send the request
// but we send it as a read stream
// we make a read stream out of the contents of the filename
// and then we pipe it int othe the compressor
// and then into rhe erequest

// so this creates a cipher object
// createCipheriv('aes192', secret, iv);

createReadStream(filename)
  // create gzip i gess has interface or methods of the writeable stream
  // so the return of this function has interface of a writeable stream
  .pipe(createGzip())
  .pipe(createCipheriv('aes192', secret, iv))
  .pipe(req)
  .on('finish', () => {
    console.log('File successfully sent');
  });

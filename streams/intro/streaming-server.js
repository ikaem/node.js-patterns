import { createServer } from 'http';
import { createWriteStream } from 'fs';
import { createGunzip } from 'zlib';
import { basename, join } from 'path';
import { createDecipheriv, randomBytes } from 'crypto';

const secret = randomBytes(24)
console.log("secret generated:", secret.toString("hex"))

const server = createServer((req, res) => {


  console.log("req", req.headers)

  const filename = basename(req.headers['x-filename']);
  const iv = Buffer.from(
    // so here we decode it as a hex value?
    // it is jsut encoding 
      req.headers["x-initialization-vector"], "hex"
  )
  const destFilename = join('received_files', filename);

  // ok, so here we just know the filename
  console.log('File request received: ', filename);

  // i guess pipe would take whatever data is there? i dont get that
  req
  // so first we decrypt data, and then we pipe decrypted data to the decompers s object 
    .pipe(createDecipheriv("aes192", secret, iv))
    // i guess we uncompress here
    // i guess the data will be in the body? or where? or somwehre lese?
    .pipe(createGunzip())
    .pipe(createWriteStream(destFilename))
    .on('finish', () => {
      // also note we are sending a plain text back
      res.writeHead(201, { 'Content-Type': 'text/plain' });
      res.end('OK\n');

      console.log('File saved: ', filename);
    });
});

server.listen(3000, () => console.log('Server is listening'));

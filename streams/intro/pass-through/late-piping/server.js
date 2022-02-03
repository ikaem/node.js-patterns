import { createServer } from 'http';
import { createWriteStream } from 'fs';
import { basename, join } from 'path';

const server = createServer((req, res) => {
  // grab the filename from the header
  const filename = basename(req.headers['x-filename']);
  // should probably create this folder somehow - mkdirp?
  const destFilename = join('received-files', filename);
  console.log('File request received');

  req.pipe(createWriteStream(destFilename)).on('finish', () => {
    res.writeHead(201, { 'Content-Type': 'text/plain' });
    res.end('OK\n');
    console.log('File saved');
  });
});

server.listen(3000, () => {
  console.log('listening');
});

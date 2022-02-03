import { dirname, join } from 'path';
import { ToFileStream } from './to-file-stream.js';
import { Writable } from 'stream';
import mkdirp from 'mkdirp';
import { promises as fs } from 'fs';

const tfs = new ToFileStream();

tfs.write({
  path: join('files', 'file1.txt'),
  content: 'Hello',
});

tfs.write({
  path: join('files', 'file2.txt'),
  content: 'Hello',
});

tfs.write({
  path: join('files', 'file3.txt'),
  content: 'Hello',
});

// and hten also we specifiy then end of tfs , what will happen when all is written7
// we specify this manually
tfs.end(() => console.log('All files created'));

// this is simplified

const simplified = new Writable({
  objectMode: true,
  write() {
    mkdirp(dirname(chunk.path))
      .then(() => fs.writeFile(chunk.path, chunk.content))
      .then(() => cb())
      .catch(cb);
  },
});

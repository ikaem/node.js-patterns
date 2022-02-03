import lazystream from 'lazystream';
import { createReadStream } from 'fs';

const lazyURandom = new lazystream.Readable((options) => {
  return createReadStream('/dev/urandom');
});



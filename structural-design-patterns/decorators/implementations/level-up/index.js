import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import Level from 'level';

import { levelSubscribe } from './level.subscribe.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const dbPath = join(__dirname, 'db');
const db = Level(dbPath, { valueEncoding: 'json' });

// now we augment - we just add our own subscribe method to it
levelSubscribe(db);

/* now we call that subscribe method */
db.subscribe(
  {
    // here is our pattern
    doctype: 'tweet',
    language: 'en',
  },
  // and we need a listener
  (k, val) => console.log(val)
);

// now we put data in
db.put(
  '1', // this is the key
  {
    // this is the value
    doctype: 'tweet',
    text: 'HI',
    language: 'en',
  }
);

db.put(
  '2', // this is the key
  {
    // this is the value
    doctype: 'tweet',
    text: 'HI',
    language: 'es',
  }
);

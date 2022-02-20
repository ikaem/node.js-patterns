import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import Level from 'level';

import { createFSAdaper } from './fs-adapter.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const db = Level(join(__dirname, 'db'), {
  valueEncoding: 'binary',
});

const fs = createFSAdaper(db);

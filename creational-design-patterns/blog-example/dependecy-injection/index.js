import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { Blog } from './blog';
import { createDb } from './db';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function main() {
  // here wae create db isntance, pass it path to the db file
  const db = createDb(join(__dirname, 'data.sqlite'));
  const blog = new Blog(db);
  await blog.initialize();
  // ...
}

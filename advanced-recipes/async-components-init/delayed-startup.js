import { once } from 'events';
import { db } from './async-db';

async function initialize() {
  db.connect();
  await once(db, 'connected');
}

async function updateLastAccess() {
  await db.query('Some query');
}

initialize().then(() => {
  updateLastAccess();
  setTimeout(() => {
    updateLastAccess();
  }, 600);
});

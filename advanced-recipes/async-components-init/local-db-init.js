import { once } from 'events';
import { db } from './async-db';

// this does not do any awaiting
db.connect();

async function updateLastAccess() {
  if (!db.connected) await once(db, 'connected');
  await db.query('Do some query');
}

// this will wait for the connect immediately
updateLastAccess();

setTimeout(() => updateLastAccess(), 600);

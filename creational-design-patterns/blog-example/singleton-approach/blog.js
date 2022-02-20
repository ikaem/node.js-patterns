import { promisify } from 'util';

import { db } from './db';

// and this is prolly used only for mutations
const dbRun = promisify(db.run.bind(db));
// i guess this gets all rows - it is like a query actually
const dbAll = promisify(db.all.bind(db));

export class Blog {
  initialize() {
    const initQuery = `
      CREATE TABLE IF NOT EXISTS posts (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT,
        created_at TIMESTAMP DEFAULT CURRENT TIMESTAMP
      );
    `;

    // so here, the promisify thing will actually pass a callabck to the thing on its own, and will resolve +once the callback returns
    return dbRun(initQuery);
  }

  createPost(id, title, content, createdAt) {
    return dbRun(
      `
      INSERT INTO posts VALUES (
        ?,?,?,?
      )
    `,
      id,
      title,
      content,
      createdAt
    );
  }

  getAllPosts() {
    return dbAll(`
      SELECT * FROM posts ORDER BY created_at DESC
    `);
  }
}

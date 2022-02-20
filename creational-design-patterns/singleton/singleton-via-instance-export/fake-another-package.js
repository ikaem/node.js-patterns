import { dbInstance } from 'singleton-via-instance-export';

export function getDbInstance() {
  return dbInstance;
}


global.dbInstance = new Database("my-db", {...})
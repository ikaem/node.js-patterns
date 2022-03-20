import { EventEmitter } from 'events';

class DB extends EventEmitter {
  connected = false;

  connect() {
    // want to simualte
    setTimeout(() => {
      this.connected = true;
      // we can do this because we extend event emitter
      this.emit('connected');
    }, 500);
  }

  async query(queryString) {
    if (!this.connected) {
      throw new Error('Not connected yet');
    }

    console.log('Query executed', queryString);
  }
}

export const db = new DB();

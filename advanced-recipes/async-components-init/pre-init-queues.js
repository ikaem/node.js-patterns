import { EventEmitter } from 'events';

class DB extends EventEmitter {
  connected = false;
  commandsQueue = [];

  async query(queryString) {
    if (this.connected) return console.log('Query executed', queryString);

    console.log('Query queued', queryString);

    // this is pretty cool - we will create a promise that will live because of closure, but we dont actually push entire promise. isntead, we push only the command theat will be using resolve and reject from the closure - very cool
    const queryPromise = new Promise((resolve, reject) => {
      const command = () => {
        // here we call recirsively the parent function too. very cool again
        // because of this, it will check again if we are connected
        this.query(queryString)
          // what if it fails?
          // what about using async await here instead of then?
          .then(resolve, reject);
      };

      this.commandsQueue.push(command);
    });

    return queryPromise;
  }

  connect() {
    // this set timeout is just a simualtion
    setTimeout(() => {
      this.connected = true;
      this.emit('connected');
      this.commandsQueue.forEach((command) => command());
      this.commandsQueue = [];
    }, 500);
  }
}

export const db = new DB();

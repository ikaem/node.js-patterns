export class OnlineState {
  constructor(failsafeSocket) {
    this.failsafeSocket = failsafeSocket;
    this.hasDisconnected = false;
  }

  send(data) {
    // this is backup
    this.failsafeSocket.queue.push(data);
    // now we write
    this.#_safeWrite(data);
  }

  #_safeWrite(data) {
    this.failsafeSocket.socket.write(data, (err) => {
      if (!this.hasDisconnected && !err) {
        // just remove the item from the queue
        // but how do we know exactly that we write this exact item
        this.failsafeSocket.queue.shift();
      }
    });
  }

  activate() {
    this.hasDisconnected = false;
    for (const data of this.failsafeSocket.queue) {
      this.#_safeWrite(data);
    }

    // also make sure we register the event listener to handle on error
    this.failsafeSocket.socket.once('error', () => {
      this.hasDisconnected = true;
      this.failsafeSocket.changeState('offline');
    });
  }
}

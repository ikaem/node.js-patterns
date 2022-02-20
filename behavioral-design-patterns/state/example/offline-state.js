import jot from 'json-over-tcp-2';

export class OfflineState {
  constructor(failsafeSocket) {
    this.failsafeSocket = failsafeSocket;
  }

  send(data) {
    // here we just push data into the queue while we are using this state
    this.failsafeSocket.queue.push(data);
  }

  activate() {
    const retry = () => {
      setTimeout(() => {
        // this is called recursively
        this.activate();
      }, 1000);
    };

    console.log('Trying to connect...');

    this.failsafeSocket.socket = jot.connect(
      this.failsafeSocket.options,
      () => {
        console.log('Connection established');
        // now we remove errr listener that we will set next
        this.failsafeSocket.socket.removeListener('error', retry);

        // now we change state on the socket
        this.failsafeSocket.changeState('online');
      }
    );

    // this is to react to an error on the socket - but call it jsut once, and remove the listener then
    this.failsafeSocket.socket.once('error', retry);
  }
}

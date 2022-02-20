import { OfflineState } from './offline-state.js';
import { OnlineState } from './online-state.js';

export class FailsafeSocket {
  constructor(options) {
    this.options = options;
    this.queue = [];
    this.currentState = null;
    this.socket = null;
    this.states = {
      // note that we pass entire socket to the class here
      offline: new OfflineState(this),
      online: new OnlineState(this),
    };

    // we call this immediately, to set it to offline
    this.changeState('offline');
  }

  changeState(state) {
    console.log(`Activating state: ${state}`);

    this.currentState = this.states[state];
    this.currentState.activate();
  }

  send(data) {
    this.currentState.send(data);
  }
}

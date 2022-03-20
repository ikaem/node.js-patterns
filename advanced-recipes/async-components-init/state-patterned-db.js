import { InitializedState, QueuingState } from './state-patterned-db-init';

class DB extends EventEmitter {
  constructor() {
    super();
    this.state = new QueuingState(this);
  }

  // this just reassings query to use current states query
  // and depending on which state is used, we will have that funcitonality
  // separation of concerns

  async query(queryString) {
    return this.state.query(queryString);
  }

  connect() {
    setTimeout(() => {
      this.connected = true;
      this.emit('connected');
      const oldState = this.state;
      this.state = new InitializedState(this);
      oldState['deactivate'] && oldState['deactivate']();
    });
  }
}

export const db = new DB();

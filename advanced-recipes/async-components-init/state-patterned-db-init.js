export class InitializedState {
  async query(queryString) {
    console.log('Query executed', queryString);
  }
}

// LATER, in the class, we will kinda define these methods viritually - they are not visible anywhere
const METHODS_REQUIRING_CONNECTION = ['query'];
const deactivate = Symbol('deactivate');

export class QueuingState {
  // i guess this will accept the db class
  constructor(db) {
    this.db = db;
    this.commandQueue = [];

    METHODS_REQUIRING_CONNECTION.forEach((methodName) => {
      // note now that we are assigning thse functions o nthe class acxtually - this
      this[methodName] = function (...args) {
        console.log('Command queued:', methodName, args);

        return new Promise((resolve, reject) => {
          const command = () => {
            db[methodName](...args).then(resolve, reject);
          };

          this.commandQueue.push(command);
        });
      };
    });
  }
  [deactivate]() {
    this.commandQueue.forEach((command) => command());
    this.commandQueue = [];
  }
}

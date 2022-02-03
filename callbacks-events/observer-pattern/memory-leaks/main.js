import { EventEmitter } from 'events';

const emitter = new EventEmitter

const thisTakesMemoty = 'A big string...';

const listener = () => {
  console.log(thisTakesMemoty);
};

emitter.on("some_event", listener);
emitter.removeListener("some_event", listener);

emitter.setMaxListeners(10)

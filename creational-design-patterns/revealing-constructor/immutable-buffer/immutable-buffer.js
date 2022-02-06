import { Buffer } from 'buffer';

const MODIFIER_NAMES = ['swap', 'write', 'fill'];

export class ImmutableBuffer {
  constructor(size, executor) {
    const buffer = Buffer.alloc(size);

    const modifiers = {};

    for (const prop in buffer) {
      if (typeof buffer !== 'function') {
        continue;
      }

      if (MODIFIER_NAMES.some((m) => prop.startsWith(m))) {
        // we want to make sure that the functions that we get are always bound to the buffer here, not matter where they are called
        modifiers[prop] = buffer[prop].bind(buffer);
      } else {
        // is this now revealed?
        this[prop] = buffer[prop].bind(buffer);
      }
    }

    executor(modifiers);
  }
}

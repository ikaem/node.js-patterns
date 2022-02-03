import { Readable } from 'stream';
import Chance from 'chance';

const chance = new Chance();

// export class RandomStream extends Readable {
//   constructor(options) {
//     super(options);
//     this.emmitedBytes = 0;
//   }

//   // this is needed - it is an abstract method
//   _read(size) {
//     const chunk = chance.string({ length: size });
//     this.push(chunk, 'utf8');

//     this.emmitedBytes += chunk.length;
//     if (chance.bool({ likelihood: 5 })) {
//       this.push(null);
//     }
//   }
// }

let emittedBytes = 0;

export const randomStream = new Readable({
  // need to use function declaration here
  read(size) {
    const chunk = chance.string({ length: size });
    // so here, we push data into the read stream - to be consumed?
    this.push(chunk, 'utf8');

    emittedBytes += chunk.length;
    if (chance.bool({ likelihood: 5 })) {
      this.push(null);
    }
  },
});


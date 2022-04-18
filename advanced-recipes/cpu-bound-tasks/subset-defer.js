import { EventEmitter } from 'events';

export class SubsetSumDefer extends EventEmitter {
  constructor(sum, set) {
    super();
    this.sum = sum;
    this.set = set;
    // i guess this will just count stuff
    this.totalSubsets = 0;
  }

  _combine(set, subset) {
    for (let i = 0; i < set.length; i++) {
      const newSubset = subset.concat(set[i]);

      // this now makes the whole thing async
      this._combineInterleaved(set.slice(i + 1), newSubset);

      // and still we process the subset in terms that we mark it as match if it is match
      this._processSubset(newSubset);
    }
  }

  _processSubset(subset) {
    console.log('Subset nr:', ++this.totalSubsets, 'is', subset);

    const res = subset.reduce((acc, curr) => acc + curr, 0);

    if (res === this.sum) this.emit('match', subset);
  }

  _combineInterleaved(set, subset) {
    // increase current running combine
    this.runningCombine++;

    setImmediate(() => {
      this._combine(set, subset);
      // check if after this execution there is any more of runnign combines left
      if (--this.runningCombine === 0) {
        this.emit('end');
      }
    });
  }

  start() {
    this.runningCombine = 0;
    this._combineInterleaved(this.set, []);
  }
}

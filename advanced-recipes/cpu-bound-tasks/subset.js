import { EventEmitter } from 'events';

export class SubsetSum extends EventEmitter {
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
      this._combine(set.slice(i + 1), newSubset);
      this._processSubset(newSubset);
    }
  }

  _processSubset(subset) {
    console.log('Subset nr:', ++this.totalSubsets, 'is', subset);

    const res = subset.reduce((acc, curr) => acc + curr, 0);

    if (res === this.sum) this.emit('match', subset);
  }

  start() {
    this._combine(this.set, []);
    this.emit('end');
  }
}

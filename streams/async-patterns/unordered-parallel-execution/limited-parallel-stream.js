export class LimitedParallelStream extends Transform {
  constructor(concurrency, usetTransform, options) {
    super({
      ...options,
      objectMode: true,
    });

    this.concurrency = concurrency;
    this.usetTransform = usetTransform;
    this.running = 0;
    this.continueCb = null;
    this.terminateCb = null;
  }

  _transform(chunk, enc, done) {
    this.running++;
    this.usetTransform(
      chunk,
      enc,
      this.push.bind(this),
      this._onComplete.bind(this)
    );

    if (this.running < this.concurrency) {
      done();
    } else {
      // and this is pretty cool - we dont call done yet, we just assign it to a variable
      // and it will be called by another function
      this.continueCb = done;
    }
  }

  _flush(done) {
    if (this.running > 0) {
      this.terminateCb = done;
    } else {
      done();
    }
  }

  _onComplete(err) {
    this.running--;

    if (err) {
      // so we emit error, we dont just return it
      return this.emit('error', err);
    }

    const tempCb = this.continueCb;
    this.continueCb = null;

    tempCb && tempCb();

    if (this.running === 0) {
      this.terminateCb && this.terminateCb();
    }
  }
}

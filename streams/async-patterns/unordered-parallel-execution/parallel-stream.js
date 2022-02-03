import { Transform } from 'stream';

export class ParallerStream extends Transform {
  constructor(userTransform, options) {
    super({ objectMode: true, ...options });

    this.userTransform = userTransform;
    this.running = 0;
    this.terminateCb = null;
  }

  _transform(chunk, enc, done) {
    this.running++;

    this.userTransform(
      chunk,
      enc,
      this.push.bind(this),
      this._onComplete.bind(this)
    );

    // done needs to be called
    done();
  }

  // ok, this is at the end
  // we check if this running is bigger than 0 - if so, we assign temrina cb to done
  // if not, we just call done
  // why do we do this

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
      return this.emit('error', err);
    }

    if ((this.running === 0)) {
      this.terminateCb && this.terminateCb();
    }
  }
}

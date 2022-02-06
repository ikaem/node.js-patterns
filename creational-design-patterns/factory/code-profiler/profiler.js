class Profiler {
  constructor(label) {
    this.label = label;
    this.lastTime = null;
  }

  // no need to bind bc always called on the object
  start() {
    console.log('starting..');
    this.lastTime = process.hrtime();
  }

  end() {
    console.log('this is called');
    const diff = process.hrtime(this.lastTime);
    console.log(
      `Time "${this.label}" took ${diff[0]} seconds and ${diff[1]} nanoseconds`
    );
  }
}

// this is for production, lets say
const noopProfiler = {
  start() {},
  end() {},
};

// and this is a factory that we export
export function createProfiler(label) {
  console.log('in the profiler creator', process.env.NODE_ENV);
  if (process.env.NODE_ENV === 'production') {
    console.log('returning partial thing');
    return noopProfiler;
  }

  console.log('returning full thing');

  return new Profiler(label);
}

// this is for infinite recursvie promsie resultion chains

function delay(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(new Date());
    }, ms);
  });
}

function leakingLoop() {
  // this might be because we wait for thins to resolve, but they never do?
  return delay(1).then(() => {
    console.log('Tick', Date.now());

    // this is the isseu, it seems
    return leakingLoop();
  });
}

// leakingLoop()

function nonLeakingLoop() {
  delay(1).then(() => {
    console.log('Tick', Date.now());

    nonLeakingLoop();
  });
}

function nonLeakingLoopWIthErrors() {
  return new Promise((resolve, reject) => {
    (function internalLoop() {
      delay(1)
        .then(() => {
          console.log('Tick', Date.now());
          internalLoop();
        })
        .catch((e) => {
          reject(e);
        });
    })();
  });
}

async function nonLeakingLoopAsync() {
  // this is what we want if something is infinite anyway - loop forever, not to od recurive infitnite looping
  while (true) {
    await delay(1);

    console.log('Tick', Date.now());
  }
}

async function leakingLoopAsync() {
  await delay(1)

  console.log("Tick", Date.now())

  return leakingLoopAsync()
}

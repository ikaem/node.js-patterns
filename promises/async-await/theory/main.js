function delay(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(new Date());
    }, ms);
  });
}

async function playingWithDelays() {
  console.log('delaying..', new Date());

  const dateAfterOneSecond = await delay(1000);
  console.log('date after one second', dateAfterOneSecond);

  return 'done';
}

// playingWithDelays()

// playingWithDelays().then((result) => console.log('result:', result));

function delayError(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("ms", ms)
      reject(new Error('Error after milliseconds:' + ms));
    }, ms);
  });
}

async function playingWithErrors(throwSyncError) {
  try {
    if (throwSyncError) {
      throw new Error('This is a sync error');
    }

    await delayError(1000);
  } catch (e) {
    console.error('We have an error', e.message);
  } finally {
    console.log('Done');
  }
}


// playingWithErrors(true)

async function errorNotCaught() {
  try {
    // return await delayError(1000)
    return delayError(1000)
  } catch(err) {
    // i would expect the error to be caught here
    console.error("Error caught by the async function", err.message)
  }
}

// the error is actually caught here - this is new to me
errorNotCaught().catch(err => console.error("Error caught by the caller:", err.message))
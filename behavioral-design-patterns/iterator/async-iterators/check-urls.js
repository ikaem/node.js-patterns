import superagent from 'superagent';

export class CheckUrls {
  constructor(urls) {
    this.urls = urls;
  }

  [Symbol.asyncIterator]() {
    // this means that the urls also have their default iterator implemented
    const urlsIterator = this.urls[Symbol.iterator]();

    return {
      // note the async next
      async next() {
        // this is just to get the next url
        const iteratorResult = urlsIterator.next();

        if (iteratorResult.done) {
          return { done: true };
        }

        const url = iteratorResult.value;

        try {
          const checkResult = await superagent
            // head just to simulate get, and not to actually get any data
            .head(url)
            .redirects(2);

          return {
            done: false,
            value: `${url} is up, status: ${checkResult.status}`,
          };
        } catch (err) {
          return {
            done: false,
            value: `${url} is down, error: ${err.message}`,
          };
        }
      },
    };
  }
}

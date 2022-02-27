import superagent from 'superagent';

export class CheckUrls {
  constructor(urls) {
    this.urls = urls;
  }

  // k, this is now ans async generator async iterator function
  // it does return a promise, so we need to use asynciterator here

  async *[Symbol.asyncIterator]() {
    for (const url of this.url) {
      try {
        const checkResult = await superagent.head(url).redirect(2);

        // and now we yield if all good
        // and we wait for the next call to next
        yield `${url} is up, status: ${checkResult.status}`;
      } catch (err) {
        yield `${url} is down, error: ${err.message}`;
      }
    }
  }
}

import { promises as fsPromises } from 'fs';
import { dirname } from 'path';
import { promisify } from 'util';

import superagent from 'superagent';
import mkdirp from 'mkdirp';

import { urlToFilename } from './utils.js';

// this mdkdirp is already a promise, actually
const mkdirpPromises = promisify(mkdirp);

function download(url, filename) {
  console.log(`Downloading ${url}`);
  let content;

  return (
    superagent
      .get(url)
      .then((res) => {
        content = res.text;
        // this is where
        // return mkdirpPromises(dirname(filename))
        return mkdirp(dirname(filename));
      })
      // this is cool - so then will call its on fulfilled callback whenever the previous rpomise either resolves or rejects
      // at that point we will have our cotnent ready
      .then(() => fsPromises.writeFile(filename, content))
      .then(() => {
        console.log(`Download and saved: ${url}`);
        return content;
      })
  );
}

// download("http://www.example.com", "example.com")

function spiderLinks(currentUrl, content, nesting) {
  // this is so cool to create and return initially a promise, and make the whole function return a promsie
  let promise = Promise.resolve();

  if (nesting === 0) return promise;

  const links = getPageLinks(currentUrl, content);
  for (const link of links) {
    // but what will this do? would it just append to the promise? - nope, it will just reassing promise object iwth a new promise every time call spider for new link
    promise = promise.then(() => spider(link, nesting - 1));
  }

  return promise;
}

export function spider(url, nesting) {
  const filename = urlToFilename(url);
  return fsPromises
    .readFile(filename, 'utf-8')
    .catch((err) => {
      // we can easily cathc error here and decid what we want to do
      if (err.code !== 'ENOENT') throw err;

      // in this case, the file does not exist - that is fine
      // we will just download the file
      return download(url, filename);
    })
    .then((content) => spiderLinks(url, content, nesting));
}

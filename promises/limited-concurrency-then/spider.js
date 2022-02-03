import { promises as fsPromises } from 'fs';
import { dirname } from 'path';
import { promisify } from 'util';

import superagent from 'superagent';
import mkdirp from 'mkdirp';

import { urlToFilename } from './utils.js';
import { TaskQueue } from './TaskQueue.js';

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

function spiderLinks (currentUrl, content, nesting, queue) {
  if(nesting === 0) {
    return Promise.resolve
  }

  const links = getPageLinks(currentUrl, content)
  const promises = links.map(link => spiderTask(link, nesting -1, queue ))

  return Promise.all(promises)
}

const spidering = new Set()
function spiderTask(url, nesting, queue) {
  if(spidering.has(url)) {
    // just return promise to make sure the thing is a promsie proper
    return Promise.resolve()
  }

  spidering.add(url)

  const filename = urlToFilename(url)

  // this is now a task to be run - we have to pass a task to be run 
  // idea is a gusss to push task first, and it kickstarts the whole thing 
  return queue.runTask(() => {
    return fsPromises.readFile(filename, "utf-8")
    .catch((err) => {
      if(err.code !== "ENOENT") {
        throw err
      }

      // so with this we will return the downlaoded data - the promise that will eventualy fulfill
      return download(url, filename)
    })
  })
  // so here in then, we expect content of the page come to us 
  .then(content => spiderLinks(url, content, nesting, queue))
}

export function spider(url, nesting, concurrency) {
  const queue = new TaskQueue(concurrency)
  // this will return a promise 
  return spiderTask(url, nesting, queue)
}




// export function spider(url, nesting) {
//   const filename = urlToFilename(url);
//   return fsPromises
//     .readFile(filename, 'utf-8')
//     .catch((err) => {
//       // we can easily cathc error here and decid what we want to do
//       if (err.code !== 'ENOENT') throw err;

//       // in this case, the file does not exist - that is fine
//       // we will just download the file
//       return download(url, filename);
//     })
//     .then((content) => spiderLinks(url, content, nesting));
// }

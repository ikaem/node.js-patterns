import fs from 'fs';
import path from 'path';
import superagent from 'superagent';
import mkdirp from 'mkdirp';
import { urlToFilename } from './utils';

export function spider(url, nesting, cb) {
  const filename = urlToFilename(url);

  fs.readFile(filename, 'utf-8', (err, fileContent) => {
    // so if error, we want to check that it is that error is no entry, before we actually quit
    if (err) {
      if (err.code !== 'ENOENT') return cb(err);

      // file does not exist, so we create it
      return download(url, filename, (err, requestContent) => {
        if (err) return db(err);

        spiderLinks(url, requestContent, nesting, cb);
      });
    }

    // at this point, there is no error, file exists
    // so we just scan it for links
    spiderLinks(url, fileContent, nesting, cb);
  });
}

function download(url, filename, cb) {
  // we just callsupraagent do download data

  superagent.get(url).end((err, res) => {
    if (err) {
      return cb(err);
    }

    // now we just save what we downloaded
    // and then we will pass data to the callback
    saveFile(filename, res.text, (err) => {
      if (err) return cb(err);
    });

    console.log('Downloaded and saved:', url);
    cb(null, res.text);
  });
}

function saveFile(filename, contents, cb) {
  mkdirp(path.dirname(filename))
    .then(() => {
      //
      fs.writeFile(filename, contents, cb);
    })
    .catch((err) => cb(err));
}

// this is actually function to crawl the links
function spiderLinks(currentUrl, body, nesting, cb) {
  // so we check if nesting is 0 - if so, we dont crawl for content
  // we call next tick, to make sure the whole function is async
  if (nesting === 0) return process.nextTick(cb);

  // we still have to define this
  // body will be parsed content, or raw, not sure
  const links = getPageLinks(currentUrl, body);
  if (links.length === 0) {
    return process.nextTick(db);
  }

  // here we actually define the function
  function iterate(index) {
    if (index === links.length) {
      // i guess we don't want to crawl if we reach end of the links array
      return cb();
    }

    // now we recursively call spider, as we know that spider called this function too?
    spider(links[index], nesting - 1, function (err) {
      if (err) {
        return cb(err);
      }

      // with this we actually grow index up to the point where it will match lenght of the array of links
      iterate(index + 1);
    });
  }

  // and this is the first call to iterate?
  // this will start recursion part
  iterate(0);
}

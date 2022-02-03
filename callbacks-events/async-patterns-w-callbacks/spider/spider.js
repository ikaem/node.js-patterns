// spider.js
import fs from 'fs';
import path from 'path';
import superagent from 'superagent';
import mkdirp from 'mkdirp';

import { urlToFilename } from './utils.js';

// export function spider(url, cb) {
//   const filename = urlToFilename(url);

//   fs.access(filename, err => {
//     // we want to exit if there is already such file
//     if(!err) return cb(null, filename, false)
//     console.log("passed")

//     //     console.log(`Downloading ${url} into ${filename}`);
//     superagent.get(url).end((err, res) => {

//       if(err) return cb(err)
//       console.log("filename", filename)

//       saveFile(filename, res.text, cb)

//     })

//   })

// fs.access(filename, (err) => {
//   if (err && err.code === 'ENOENT') {
//     // SO IN this case we proceed with scraping

//     console.log(`Downloading ${url} into ${filename}`);

//     superagent.get(url).end((err, res) => {
//       if (err) return cb(err);
//       // } else {

//       saveFile(filename, res.text, (err, filename, downloaded) => {
//         cb(err)
//       })
//   } else {
//     // no scraping here because such file already exists
//     cb(null, filename, false);
//   }
// });
/*  */

export function spider(url, cb) {
  const filename = urlToFilename(url);
  fs.access(filename, (err) => {

    // if there is no error, or if there is error, but the error code is not that we cannot access the file
    if(!err || err.code !== "ENOENT") {
      return cb(null, filename, false) 
    }

    download(url, filename, err => {
      if(err) return cb(err)
    })

    // at this point, we donwloaded the file 
    cb(null, filename, true)

  });
}

function saveFile(filename, contents, cb) {
  mkdirp(path.dirname(filename))
    .then(() => {
      // this cb will catch error
      fs.writeFile(filename, contents, cb);
    })
    .catch((err) => cb(err));
}

function download(url, filename, cb) {
  console.log('downloading', url);

  superagent.get(url).end((err, res) => {
    if (err) {
      return cb(err);
    }

    saveFile(filename, res.text, (err) => {
      if (err) {
        return cb(err);
      }

      console.log('Downlaoded and saved:', url);
      cb(null, res.text);
    });
  });
}

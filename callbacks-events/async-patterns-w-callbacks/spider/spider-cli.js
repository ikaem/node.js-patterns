// spider-cli

import { spider } from "./spider.js";

spider(process.argv[2], (err, filename, downloaded) => {
  if(err) {
    console.error(err)
  } else if(downloaded) {
    console.log(`Completed the download of "${filename}"`)
  } else {
    console.log(`"${filename}" was already downloaded`)
  }
})

function saveFile(filename, contents, cb) {
  mkdirp(path.dirname(filename))
    .then(() => {
      fs.writeFile(filename, contents, cb);
    })
    .catch((err) => cb(err));
}


        // this will create all directories recursively, based on a path
        // and path name will return a string with directory names of a path
        // mkdirp(path.dirname(filename), (err) => {
        //   if (err) {
        //     cb(err);
        //   } else {
        //     // now we write file because we already created folder
        //     // we get res.text from superagent
        //     // fs.writeFile(filename, res.text, err => {
        //     //   if(err) {
        //     //     console.log("error here")
        //     //     cb(err)
        //     //   } else {
        //     //     // we are good here now
        //     //     cb(null, filename, true)
        //     //   }
        //     // })
        //     console.log('test');
        //   }
        // });

        // mkdirp(path.dirname(filename))
        //   .then(() => {
        //     // now we write file because we already created folder
        //     // we get res.text from superagent
        //     fs.writeFile(filename, res.text, (err) => {
        //       if (err) return cb(err);
        //       // } else {
        //       // we are good here now
        //       cb(null, filename, true);
        //       // }
        //     });
        //     console.log('test');
        //   })
        //   .catch((err) => {
        //     cb(err);
        //   }
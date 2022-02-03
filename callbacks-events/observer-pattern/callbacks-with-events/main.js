// const eventEmitter = glob(pattern, [options], callback)

import glob from "glob"

// so this is a glob pattern
glog("data/*.txt", 
// data is passed automatically to the callback
  (err, files)  => {
    if(err) {
      return console.error(err)
    }

    console.log("All files found", JSON.stringify(files))
  }


  // match will be provided as an argument 
).on("match", match => console.log("Match found", match))
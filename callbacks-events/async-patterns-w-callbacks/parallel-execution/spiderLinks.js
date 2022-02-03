import { urlToFilename } from "../sequential-execution/utils";

function spiderLinks(currentUrl, body, nesting, cb) {
  if (nesting === 0) {
    return process.nextTick(cb);
  }

  const links = getPageLinks(currentUrl, body);
  if (links.length === 0) {
    return process.nextTick(cb);
  }

  let completed = 0;
  let hasErrors = false;

  function done(err) {
    if (err) {
      hasErrors = true;
      return cb(err);
    }

    if (++completed === links.length && !hasErrors) {
      return cb();
    }
  }

  // do we get same instance of the funciton, or new one is created every time 
  links.forEach((link) => spider(link, nesting - 1, done));
}


// this has a race condition
// race donction is where we check that a file already exists before we start the downlaod 

export function spider(url, nesting, cb) {
  const filename = urlToFilename(url)

  fs.readFile(filename, "utf", (err, fileContent) => {
    // here is the race condtion 
    if(err) {
      if(err.code !== "ENOENT") {
        return cb(err)
      }

      return download(url, filename, (err, requestContent) => {
        /* ... */
      })
    }
  })
}

// fix to prevent race conditions 
const spidering = new Set()
function spider(url, nesting, cb) {
  if(spidering.has(url)) {
    
    // we return now, because this url has already been process or is in process of processing 
    return process.nextTick(cb)
  }

  spidering.add(url)

  // and now continue with processing, very nice 
}
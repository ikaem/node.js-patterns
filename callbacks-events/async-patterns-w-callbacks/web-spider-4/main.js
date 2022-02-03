import { TaskQueue } from "../globally-limiting-concurrency/mainl";
import { getPageLinks, urlToFilename } from "../sequential-execution/utils";

function spiderTask(url, nesting, queue, cb) {
  const filename = urlToFilename(url)

  fs.readFile(filename, "utf8", (err, fileContent) => {
    if(err) {
      // we now check if the error is not enoent - if we have error, best is to have enoent , because it means that we dont have the file 
      // if it was some other error, then we dont know how to handle it 
      if(err.code !== "ENOENT") {
        return cb(err)
      }

      // at this point, the error is that we dont have the file , so we donwload it 
      return download(url, filename, (err, requestContent) => {
        if(err) {
          // this cb is comming from the actual argument of the parent most function
          return cb(err)
        }

        // if no error, we just scan other links on the page i guess 
        spiderLinks(url, requestContent, nesting, queue)
        // and now we return cb becuase we are done 
        return cb()
      })
    }

    // at this point, there is no errors - we were able to read the filename - we jsut want to scan it?
    spiderLinks(url, fileContent, nesting, queue)
    return cb()
  })
}

function spiderLinks (currentUrl, body, nesting, queue) {
  if(nesting === 0) {
    return
  }

  const links = getPageLinks(currentUrl, body)
  if(links.length === 0) {
    return
  }

  links.forEach(link => spider(link, nesting - 1, queue))
}

const spidering = new Set() 
export function spider(url, nesting, queue) {
  if(spidering.has(url)) {
    return
  }

  spidering.add(url)

  // here we add the task 
  // where is this done coming from 
  // this is like err or done - we can pass it valid value to indicate that we are through?
  // so task accepts a callback - and callback will call spider task, and pass it that done thing 
  // and it will pass it 
  // oh, so no - the task itself is a callback 
  // and once the task is invoked , it will actually call the spider task 
  // but it will need the done argument to be passed to it - to the function which is task 
  // and done argument itself is a callback
  queue.pushTask((doneCallback /* this is a callback - done, it is not a boolean*/) => {
    // done callback which is argument to the task, is passed to spider task 
    spiderTask(url, nesting, queue, doneCallback)
  })
}

// this is cli 
const url = process.argv[2]
const nesting = Number.parseInt(process.argv[3], 10) || 1
const concurrency = Number.parseInt(process.argv[4], 10) || 2

const spiderQueue = new TaskQueue(concurrency)
spiderQueue.on("error", console.error)
spiderQueue.on("empty", () => console.log("Downlaod complete"))
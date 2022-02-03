import {EventEmitter} from "events"

function helloEvents() {
  const eventEmitter = new EventEmitter()
  setTimeout(() => eventEmitter.emit("complete", "hello world"), 100)

  return eventEmitter;
}

function helloCallback(cb) {
  setTimeout(() => cb(null, "hello world"), 100)
}

helloEvents().on("complete", message => console.log(message))
// the callback will be called after 100ms
helloCallback((error, message) => console.log(message))
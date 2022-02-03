// export class TaskQueue {
//   constructor(concurrency) {
//     this.concurrency = concurrency
//     this.running = 0
//     this.queue = []
//   }

//   pushTask(task) {
//     // when do we call this anyway?
//     this.queue.push(task)
//     // we just bind the call to the instance of now, so that next calls local variables wherever it is called 
//     process.nextTick(this.next.bind(this))
//   }

//   next() {
//     while(this.running < this.concurrency && this.queue.length) {
//       const task = this.queue.shift()

//       task(() => {
//         // this will happens at the end of processing the task, as part of the finall call to the callback
//         this.running--
//         process.nextTick(this.next.bind(this))
//       })
//       // this will happen right after task returns, which is immeidately 
//       this.running++
//     }
//   }
// }

// better task queue
export class TaskQueue extends EventEmitter {
  constructor(concurrency) {
    super()
    this.concurrency = concurrency
    this.running = 0
    this.queue = []
  }

  pushTask(task) {
    this.queue.push(task)
    // we can bind function to anything 
    process.nextTick(this.next.bind(this))
  }


  next() {
    if(this.running === 0 && this.queue.length === 0) {
      // we can emit because we extend evcent emitter 
      return this.emit("empty")
    }
    
    while(this.running < this.concurrency && this.queue.length) {
      const task = this.queue.shift()

      // here, we call the task, and we pass it a callback 
      // here we know that the task function accepts actually a done callback 
      // here we invoke task
      // task will do its job, calling spider task 
      // and then inline we define what is the 'done' callback
      // we say that it eitther accepts an error and what happens 
      task((err) => {
        if(err) {
          // note that we dont return - we just move on
          this.emit("error", err)
        }

        this.running--
        process.nextTick(this.next.bind(this))
      })

      this.running++
    }
  }
}
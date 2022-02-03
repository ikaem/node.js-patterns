export class TaskQueuePC {
  constructor(concurrency) {
    this.taskQueue = [];
    this.consumerQueue = [];

    // spawn consumers
    for (let i = 0; i < concurrency; i++) {
      this.consumer();
    }
  }

  // always better maybe to define arrow function here to bind their this to the class? object instnace?
  // this is fine because the function is always called from the class
  // this might be better called consume()?
  async consumer() {
    while(true) {
      try {
        const task = await this.getNextTask()
        await task()

      } catch(err) {
        console.error(err)
      }
    }
  }


  async getNextTask() {
    return new Promise((resolve) => {
      if(this.taskQueue.length !== 0) {
        return resolve(this.taskQueue.shift())
      }

      // what does this accomplish?
      // this accomplishes that we suspend resolution of a task (because no task exists) until a task is ready 
      // because of this, consumer keeps awaiting on the task
      this.consumerQueue.push(resolve)
    })
  }


  runTask(task) {
    return new Promise((resolve, reject) => {
      const taskWrapper = () => {
        // we will ge ta promise here 
        const taskPromise = task()
        // we await kind for the promsie where with resolve and reject 
        taskPromise.then(resolve, reject)
        // this is still a promsie object returned 
        return taskPromise
      }

      // ok, now we see what we do 
      // idea is to run a task passed the function
      // so if there is a free consumer, we will run the task by passing it to the 
      if(this.consumerQueue.length !== 0) {
        // so we get a consumer here 
        const consumer = this.consumerQueue.shift()
        // cosnumer is a resolve function 
        // so we resolve task wrapper - but the task wrapper should be called? i guess resolve accepts a callback?
        consumer(taskWrapper)
      } else {
        // otherwise, we just push a new task into the task wrapper if there is no consumers available
        // how to they become available again ? in the next while true cycle?
        this.taskQueue.push(taskWrapper)
      }
    })
  }
}

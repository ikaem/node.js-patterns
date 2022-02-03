const tasks = [...]

const concurrency = 2
let running = 0
let completed = 0
let index = 0

function next() {
  while (running < concurrency && index < tasks.length) {
    const task = tasks[index++]
    task(() => {
      if(++completed === tasks.length) {
        return finish()
      }

      // but this is async I will assume - this will only be called once some code above for the task itself has been done async
      running--
      // so once the task is done, and we reduce number of running tasks, we go for another one
      next()
    })

    running++
  }
}

next()
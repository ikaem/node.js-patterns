const tasks = [/*...*/]

let completed = 0
tasks.forEach(task => {
  task(() => {
    if(++completed === tasks.length) {
      // but this could be some kind of return finish
      // or, inside finish we would call something else maybe? return some other callback?
      finish()
    }
  })
})

function finish() {
  // when all tasks complete
}
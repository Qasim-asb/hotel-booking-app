let subscribers = new Set()
let interval = null

const start = () => {
  if (interval) return

  interval = setInterval(() => {
    subscribers.forEach(cb => cb())
  }, 3000)
}

const stop = () => {
  if (subscribers.size === 0 && interval) {
    clearInterval(interval)
    interval = null
  }
}

export const subscribe = (cb) => {
  subscribers.add(cb)
  start()

  return () => {
    subscribers.delete(cb)
    stop()
  }
}
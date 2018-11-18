import { inBrowser } from 'analytics-utils'

function listen(evts, func, toAdd) {
  if (!inBrowser) return false
  let fn = window[(toAdd ? 'add' : 'remove') + 'EventListener']
  evts.split(' ').forEach(ev => {
    fn(ev, func)
  })
}

export function check() {
  return Promise.resolve(!navigator.onLine)
}

export function watch(cb) {
  let fn = _ => check().then(cb)
  let listener = listen.bind(null, 'online offline', fn)
  listener(true)
  return _ => {
    listener(false)
  }
}

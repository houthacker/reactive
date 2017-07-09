import Reactive from './core/reactive'

let reactive = new Reactive()

let state = {
  a: {
    b: 1
  },
  b: {
    c: 2
  }
}
reactive.observe(state)

let fn = reactive.track(() => {
  console.log('a.b = ', state.a.b)
})

fn()

state.a.b = 1337
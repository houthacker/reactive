# Reactive

Lightweight framework providing reactivity. Purely for educational purposes, you have been warned.

## Example usage
```node
import Reactive from './src/core/reactive'

let options = {
  model: {
    data: 0
  },
  methods: {
    trackData () {
      console.log(this.data)
    }
  }
}

const reactive = new Reactive(options)
options.model.data = 1337
```
The source above will print:
```bash
$ 0
$ 1337
```
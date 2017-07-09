import { Type as TypeUtil } from './util'
let _currentJob = null

function reactify(obj, key, dependents) {
  let _value = obj[key]
  Object.defineProperty(obj, key, {
    enumerable: true,
    get () {
      if (_currentJob) {
        dependents.add(_currentJob)
      }
      return _value
    },
    set (newValue) {
      _value = newValue

      // If the value is updated, recompute all dependents
      dependents.forEach(computation => computation())
    }
  })
}

function reactifyArray(array, dependents) {
  // todo
}

class Reactive {

  constructor(options) {
    options = options || {}
    const self = this
    if (options.model) {
      self.observe(options.model)
    }
    if (options.methods) {
      Object.keys(options.methods).forEach((methodName) => {
        const bound = options.methods[methodName].bind(options.model)
        const tracked = self.track(bound)
        options.methods[methodName] = tracked
        tracked()
      })
    }
  }

  /**
   *
   * @param {function} fn
   */
  track (computation) {
    const job = () => {
      _currentJob = job
      computation()
      _currentJob = null
    }
    return job
  }

  /**
   *
   * @param {object} obj
   */
  observe (obj) {
    const self = this
    if (TypeUtil.isArray(obj)) {
      const dependents = new Set()
      reactifyArray(obj, dependents)
    } else {
      // Iterate over all enumerable properties of the object
      Object.keys(obj).forEach((key) => {
        const dependents = new Set()

        reactify(obj, key, dependents)
        let value = obj[key]  
        if (TypeUtil.isObject(value) || TypeUtil.isArray(value)) {
          self.observe(value)
        }
      })
    }
  }
}

export default Reactive
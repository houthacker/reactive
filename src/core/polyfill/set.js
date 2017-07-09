const Crypto = () => { return require('crypto-js') }
const sha1 = (value) => { return Crypto().SHA1(value).toString() }

class Set {

  constructor(iterable) {
    Object.defineProperty(this, 'objects', {
      writable: true,
      value: []
    })

    Object.defineProperty(this, Symbol.iterator, {
      enumerable: true,
      get () {
        return () => { return new SetIterator(this.data) }
      }
    })

    Object.defineProperty(this, 'ordinal', {
      writable: true,
      value: 0
    })

    Object.defineProperty(this, 'size', {
      get () {
        return Object.keys(this.data).length
      }
    })

    Object.defineProperty(this, 'data', {
      writable: true,
      value: {}
    })

    if (iterable) {
      for(const value of iterable) {
        this.add(value)
      }
    }
  }

  add (value) {

    // If value is an object and already contained in this Set, then return
    if (value && typeof(value) === 'object') {
      if (this.objects.find((element) => {
        return element === value
      }) !== undefined) {
        return
      } else {
        this.objects.push(value)
      }
    }

    const hashed = sha1(JSON.stringify(value))
    if (!Object.prototype.hasOwnProperty.call(this.data, hashed)) {
      this.data[hashed] = {
        ordinal: ++this.ordinal,
        value: value
      }
    }
  }

  clear () {
    this.data = {}
    this.objects = []
  }

  delete (value) {
    const hashed = sha1(JSON.stringify(value))
    delete this.data[hashed]
    
    if (value && typeof value === 'object') {
      const index = this.objects.indexOf(value) // todo >= IE 9!
      if (index !== -1) {
        this.objects.splice(index, 1)
      }
    }

    return value
  }

  entries () {
    return new SetIterator(this.data, true)
  }

  forEach (fn, thisArg) {
    thisArg = thisArg || this
    this.values().forEach(element => {
        fn.call(thisArg, element.value)
    })
  }

  has(value) {
    if (value && typeof value === 'object') {
      return this.objects.find((element) => {
        return element === value
      }) !== undefined
    }
    return Object.prototype.hasOwnProperty.call(this.data, sha1(JSON.stringify(value)))
  }

  keys () {
    return Object.keys(this.data)
  }

  values () {
    return new SetIterator(this.data)
  }
}

class SetIterator {
  constructor(data, forEntries = false) {
      Object.defineProperty(this, 'index', {
        writable: true,
        value: 0
      })

      let sorted = Object.keys(data).map(key => {
        return data[key]
      }).sort((left, right) => {
        if (left.ordinal < right.ordinal) {
          return -1
        } else if (left.ordinal > right.ordinal) {
          return 1
        }
        return 0
      }).map(element => {
        return forEntries ? [element.value, element.value] : element.value
      })

      Object.defineProperty(this, 'data', {
        enumerable: true,
        writable: false,
        value: sorted
      })
  }

  next () {
    let result = {
      done: true,
      value: undefined
    }

    if (this.index < this.data.length) {
      result.done = false
      result.value = this.data[this.index]
      this.index++
    }

    return result
  }
}

export default Set
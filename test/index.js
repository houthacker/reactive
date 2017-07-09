import path from 'path'
import should from 'should'

global.SRC_ROOT = (path.dirname(path.dirname(__filename)) + '/src')
console.log(SRC_ROOT)

function importTest (name, path) {
  describe(name, () => {
    require(path)
  })
}

describe("suite", () => {
  const tests = [
    { name: 'polyfill/set', testCase: './polyfill/set' },
    { name: 'core/reactive', testCase: './core/reactive.js' }
  ]

  tests.forEach((test) => {
    importTest(test.name, test.testCase)
  })
  
})

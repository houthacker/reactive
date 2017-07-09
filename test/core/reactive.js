import should from 'should'
import Reactive from '../../src/core/reactive'

describe('Reactive', () => {
  describe('#track', () => {
    it('should not execute the provided function', () => {
      let executions = 0
      
      const fn = () => { executions++ }
      new Reactive().track(fn)

      should(executions).be.exactly(0)
    })
  })

  describe('#observe', () => {
    it('should call tracked functions exactly once when the state gets updated', () => {
      let updates = {
        amount: 0,
        lastValue: undefined
      }
      let options = {
        model: {
          data: 0
        },
        methods: {
          trackData () {
            if (this.data !== 0) {
              updates.amount++
              updates.lastValue = this.data
            }
          }
        }
      }
      
      const reactive = new Reactive(options)
      should(updates.amount).be.exactly(0)
      
      options.model.data = 1337
      should(options.model.data).be.exactly(1337)
      should(updates.amount).be.exactly(1)
      should(updates.lastValue).be.exactly(options.model.data)
    })
  })
})
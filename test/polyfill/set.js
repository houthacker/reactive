import should from 'should'
import {Set as PSet} from '../../src/core/polyfill'

describe('Set', () => {
  it('should be an Iterator', () => {
    const set = new PSet()
    should(set).have.property(Symbol.iterator)
  })
  it('should have an initial size of 0', () => {
    const set = new PSet()
    should(set.size).be.exactly(0)
  })
  it('should take another iterable as initial source', () => {
    const source = [1,2,3]
    const set = new PSet(source)
    should(set.size).be.exactly(source.length)
  })

  describe('#add', () => {
    it('should increase the Set size by exactly one', () => {
      const set = new PSet()
      const size = set.size
      set.add(1)
      should(set.size).be.exactly(size + 1)
    })
    it('should add the given element to the Set', () => {
      const set = new PSet()
      const obj = { foo: 'bar' }
      set.add(obj)
      should(set.has(obj)).be.true()
    })
    it('should not add an element with equal contents twice', () => {
      const set = new PSet()
      const obj = { foo: 'bar' }
      set.add(obj)

      const size = set.size
      set.add(obj)
      should(set.size).be.exactly(size)
    })
    it('should not add an object twice', () => {
      const set = new PSet()
      const obj = { foo: 'bar' }
      set.add(obj)

      const size = set.size
      obj.bar = 'foo'
      set.add(obj)
      should(set.size).be.exactly(size)
      should(set.has(obj)).be.true()
    })
  })

  describe('#clear', () => {
    it('should clear the contents of the Set', () => {
      const set = new PSet()
      const obj = {}
      set.add(obj)
      set.clear()
      should(set.has(obj)).be.false()
      should(set.size).be.exactly(0)
    })
  })

  describe('#delete', () => {
    it('should not contain the value after deleting it', () => {
      const set = new PSet()
      const obj = { foo: 'bar' }
      set.add(obj)

      set.delete(obj)
      should(set.has(obj)).be.false()
      should(set.size).be.exactly(0)
    })
    it('should return the removed value', () => {
      const set = new PSet()
      const obj = { foo: 'bar' }
      set.add(obj)

      const deleted = set.delete(obj)
      should(deleted).be.exactly(obj)
    })
  })

  describe('#entries', () => {
    it('should return an iterator', () => {
      const set = new PSet()
      const entries = set.entries()

      should(entries).be.an.iterator()
    })
    
  })
})
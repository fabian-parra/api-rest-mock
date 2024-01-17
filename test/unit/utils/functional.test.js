import {describe, it} from 'node:test'
import assert from 'node:assert/strict'
import {isNull, not, pipe} from 'api-rest-mock/utils/functional'

describe('[Utils] functional', () => {
  describe('isNull', () => {
    it('should return true when is null', () => {
      assert.equal(isNull(null), true)
    })
    it('should return false when is undefined', () => {
      assert.equal(isNull(undefined), false)
    })
  })

  describe('not', () => {
    it('should invert boolean result from function', () => {
      const isNotNull = not(isNull)
      assert.equal(isNotNull(null), false)
    })
  });

  describe('pipe', () => {
    it('should concatenate several functions', () => {
      const sumTwo = value => value + 2
      const sumFour = pipe(sumTwo, sumTwo)
      assert.equal(sumFour(0), 4)
    })
  })
})

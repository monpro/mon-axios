import CancelToken from '../../src/cancel/CancelToken'
import Cancel from '../../src/cancel/Cancel'
import { Canceler } from '../../src/types'

describe('test for cancelTaken', () => {
  describe('reason', () => {
    test('should return a call when requesting an cancellation', () => {
      let cancel: Canceler
      let token = new CancelToken(c => {
        cancel = c
      })
      cancel!('Operation has been cancelled')
      expect(token.reason).toEqual(expect.any(Cancel))
      expect(token.reason!.message).toBe('Operation has been cancelled')
    })

    test('Cancel should not have side effects when called multiple times', () => {
      let cancel: Canceler
      let token = new CancelToken(c => {
        cancel = c
      })
      cancel!('Operation has been canceled')
      cancel!('Operation has been canceled')
      expect(token.reason).toEqual(expect.any(Cancel))
      expect(token.reason!.message).toBe('Operation has been canceled')
    })

    test('Should return undefined if cancellation has not been requested', () => {
      const token = new CancelToken(() => {
        return
      })
      expect(token.reason).toBeUndefined()
    })
  })
})

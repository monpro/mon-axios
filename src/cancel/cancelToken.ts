import { CancelExecutor } from '../types/index'

interface ResolvePromise {
  (reason?: string): void
}

export default class CancelToken {
  promise: Promise<string>
  reason?: string
  constructor(exectutor: CancelExecutor) {
    let resolvePromise: ResolvePromise

    this.promise = new Promise<string>(resolve => {
      resolvePromise = resolve
    })
    exectutor(message => {
      if (this.reason) {
        return
      }
      this.reason = message
      resolvePromise(this.reason)
    })
  }
}

import axios from '../src/index'
import { getAjaxRequest } from './helper'

describe('progress', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })
})

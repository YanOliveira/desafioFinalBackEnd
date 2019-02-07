'use strict'

class SessionShow extends require('../Validator') {
  get rules () {
    return {
      email: 'required|email'
    }
  }
}

module.exports = SessionShow

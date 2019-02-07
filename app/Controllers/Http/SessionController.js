'use strict'

const User = use('App/Models/User')

class SessionController {
  async store ({ request, auth }) {
    const { email, password } = request.all()
    const { token, type } = await auth.attempt(email, password)
    const user = await User.findByOrFail('email', email)
    const userToken = await user.tokens().create({ token, type })
    return userToken
  }

  async show ({ request }) {
    const { email } = request.all()
    const user = await User.findByOrFail('email', email)
    const userToken = await user.tokens().fetch()
    return userToken
  }
}

module.exports = SessionController

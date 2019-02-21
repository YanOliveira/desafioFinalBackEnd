'use strict'

const User = use('App/Models/User')

class UserController {
  async show ({ auth }) {
    const user = await User.findByOrFail('id', auth.user.id)
    await user.load('technologies')
    return user
  }

  async store ({ request }) {
    const data = request.only(['name', 'email', 'password'])
    const user = await User.create(data)
    return user
  }

  async update ({ params, request, response, auth, error }) {
    const user = await User.findByOrFail('id', params.id)
    const { technologies, ...data } = request.only([
      'name',
      'new_password',
      'technologies'
    ])
    if (technologies && technologies.length > 0) {
      await user.technologies().sync(technologies)
      await user.load('technologies')
    }

    user.password = data.new_password
    user.name = data.name
    await user.save()
    return user
  }
}

module.exports = UserController

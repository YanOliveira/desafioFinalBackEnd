'use strict'

const Meetup = use('App/Models/Meetup')

class MeetupController {
  async index ({ request, response, view }) {}

  async store ({ request }) {
    const { technologies, ...data } = request.only([
      'title',
      'description',
      'localization',
      'technologies'
    ])

    const meetup = await Meetup.create(data)
    await meetup.technologies().attach(technologies)
    await meetup.load('technologies')

    return meetup
  }

  async show ({ params, request, response, view }) {}

  async update ({ params, request, response }) {}

  async destroy ({ params, request, response }) {}
}

module.exports = MeetupController

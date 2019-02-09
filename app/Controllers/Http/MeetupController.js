'use strict'

const Meetup = use('App/Models/Meetup')
const Database = use('Database')

class MeetupController {
  async index ({ params, request, response, auth }) {
    const technologiesUser = Database.select('meetup_id')
      .from('technology_user')
      .where('user_id', auth.user.id)
      .innerJoin(
        'meetup_technology',
        'technology_user.technology_id',
        'meetup_technology.technology_id'
      )

    const meetups = await Meetup.query()
      .whereIn('id', technologiesUser)
      .with('technologies')
      .fetch()

    return meetups
  }

  async store ({ request }) {
    const { technologies, ...data } = request.only([
      'title',
      'description',
      'localization',
      'technologies',
      'file_id'
    ])

    const meetup = await Meetup.create(data)
    await meetup.technologies().attach(technologies)
    await meetup.load('technologies')

    return meetup
  }

  async show ({ params, request, response, view }) {}
}

module.exports = MeetupController

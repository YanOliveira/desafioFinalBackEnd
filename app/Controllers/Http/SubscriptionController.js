'use strict'

const Meetup = use('App/Models/Meetup')

class SubscriptionController {
  async index ({ request, params, auth }) {
    const { registered, page, search } = request.get()
    if (registered === 'true') {
      const meetupsRegistered = await auth.user
        .meetups()
        .where('title', 'LIKE', search ? `%${search}%` : '%%')
        .with('technologies')
        .paginate(page)
      return meetupsRegistered
    } else if (registered === 'false') {
      const { rows } = await auth.user.technologies().fetch()
      let userTechnologies = []
      rows.map(item => {
        userTechnologies.push(item.id)
      })

      const meetupsNotRegistered = await Meetup.query()
        .where('title', 'LIKE', search ? `%${search}%` : '%%')
        .innerJoin(
          'meetup_technology',
          'meetups.id',
          'meetup_technology.meetup_id'
        )
        .whereIn('technology_id', userTechnologies)
        .with('technologies')
        .paginate(page)

      return meetupsNotRegistered
    } else {
      const meetups = await Meetup.query()
        .where('title', 'LIKE', search ? `%${search}%` : '%%')
        .with('technologies')
        .paginate(page)
      return meetups
    }
  }

  async store ({ params, auth }) {
    const meetup = await Meetup.findByOrFail('id', params.id)
    await meetup.users().attach(auth.user.id)
    await meetup.load('users')
    return meetup
  }
}

module.exports = SubscriptionController

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
        .with('users')
        .paginate(page, 3)
      return meetupsRegistered
    } else if (registered === 'false') {
      const { rows: registereds } = await auth.user
        .meetups()
        .select('id')
        .fetch()
      let registeredsIds = []
      registereds.forEach(item => {
        registeredsIds.push(item.id)
      })
      const meetupsNotRegistered = await Meetup.query()
        .where('title', 'LIKE', search ? `%${search}%` : '%%')
        .whereNotIn('id', registeredsIds)
        .with('technologies')
        .with('users')
        .paginate(page, 3)
      return meetupsNotRegistered
    } else {
      const { rows } = await auth.user.technologies().fetch()
      let userTechnologies = []
      rows.forEach(item => {
        userTechnologies.push(item.id)
      })
      const { rows: join } = await Meetup.query()
        .select('meetup_id as id')
        .innerJoin(
          'meetup_technology',
          'meetups.id',
          'meetup_technology.meetup_id'
        )
        .whereIn('technology_id', userTechnologies)
        .fetch()
      let meetupsIds = []
      join.forEach(item => {
        meetupsIds.push(item.id)
      })
      const meetups = await Meetup.query()
        .whereIn('id', meetupsIds)
        .with('technologies')
        .with('users')
        .paginate(page, 3)
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

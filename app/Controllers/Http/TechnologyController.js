'use strict'

const Technology = use('App/Models/Technology')

class TechnologyController {
  async index ({ request }) {
    const technologies = await Technology.query().fetch()
    return technologies
  }

  async store ({ request, response }) {
    const name = request.only('name')
    const technology = await Technology.create(name)
    return technology
  }
}

module.exports = TechnologyController

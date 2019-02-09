'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Meetup extends Model {
  technologies () {
    return this.belongsToMany('App/Models/Technology')
  }
  file () {
    return this.belongsTo('App/Models/File')
  }
  users () {
    return this.belongsToMany('App/Models/User')
  }
}

module.exports = Meetup

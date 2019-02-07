'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UserTechnology extends Model {
  users () {
    return this.hasMany('App/Models/User')
  }
  technologies () {
    return this.hasMany('App/Models/Technology')
  }
}

module.exports = UserTechnology

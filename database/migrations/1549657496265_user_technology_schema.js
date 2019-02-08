'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserTechnologySchema extends Schema {
  up () {
    this.create('technology_user', table => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('users.id')
        .onDelete('cascade')
        .index('users_id')
      table
        .integer('technology_id')
        .unsigned()
        .references('technologies.id')
        .onDelete('cascade')
        .index('technology_id')
    })
  }

  down () {
    this.drop('technology_user')
  }
}

module.exports = UserTechnologySchema

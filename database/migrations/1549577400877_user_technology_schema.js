'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserTechnologySchema extends Schema {
  up () {
    this.create('user_technologies', table => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .notNullable()
      table
        .integer('technology_id')
        .unsigned()
        .references('id')
        .inTable('technologies')
        .notNullable()

      table.timestamps()
    })
  }

  down () {
    this.drop('user_technologies')
  }
}

module.exports = UserTechnologySchema

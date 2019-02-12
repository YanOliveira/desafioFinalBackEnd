'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MeetupUserSchema extends Schema {
  up () {
    this.create('meetup_user', (table) => {
      table.increments()
      table
        .integer('meetup_id')
        .unsigned()
        .references('meetups.id')
        .onDelete('cascade')
        .index('meetup_id')
      table
        .integer('user_id')
        .unsigned()
        .references('users.id')
        .onDelete('cascade')
        .index('user_id')
    })
  }

  down () {
    this.drop('meetup_user')
  }
}

module.exports = MeetupUserSchema

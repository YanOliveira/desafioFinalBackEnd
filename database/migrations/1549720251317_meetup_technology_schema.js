'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MeetupTechnologySchema extends Schema {
  up () {
    this.create('meetup_technology', table => {
      table.increments()
      table
        .integer('meetup_id')
        .unsigned()
        .references('meetups.id')
        .onDelete('cascade')
        .index('meetup_id')
      table
        .integer('technology_id')
        .unsigned()
        .references('technologies.id')
        .onDelete('cascade')
        .index('technology_id')
    })
  }

  down () {
    this.drop('meetup_technology')
  }
}

module.exports = MeetupTechnologySchema

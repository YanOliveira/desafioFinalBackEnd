'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MeetupSchema extends Schema {
  up () {
    this.create('meetups', table => {
      table.increments()
      table.string('title').notNullable()
      table.string('description').notNullable()
      table.string('localization').notNullable()
      table
        .integer('file_id')
        .unsigned()
        .references('files.id')
        .onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('meetups')
  }
}

module.exports = MeetupSchema

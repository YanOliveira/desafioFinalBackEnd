'use strict'

class MeetupStore extends require('../Validator') {
  get rules () {
    return {
      title: 'required',
      description: 'required',
      localization: 'required',
      technologies: 'required',
      file_id: 'required|unique:meetups'
    }
  }
}

module.exports = MeetupStore

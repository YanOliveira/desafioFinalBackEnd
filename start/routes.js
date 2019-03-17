'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store').validator('User/Store')
Route.post('sessions', 'SessionController.store').validator('Session/Store')
Route.get('sessions', 'SessionController.show').validator('Session/Show')
Route.get('files/:id', 'FileController.show')

Route.group(() => {
  Route.put('users', 'UserController.update').validator('User/Update')
  Route.get('users', 'UserController.show')

  Route.get('technologies', 'TechnologyController.index')
  Route.post('technologies', 'TechnologyController.store').validator(
    'Technology/Store'
  )
  Route.post('files', 'FileController.store').validator('File/Store')

  Route.get('meetups', 'MeetupController.index')
  Route.get('meetups/:id', 'MeetupController.show')
  Route.post('meetups', 'MeetupController.store').validator('Meetup/Store')

  Route.get('subscriptions', 'SubscriptionController.index')
  Route.post('subscriptions/:id', 'SubscriptionController.store')
}).middleware(['auth'])

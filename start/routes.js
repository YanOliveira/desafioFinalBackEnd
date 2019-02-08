'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store').validator('User/Store')
Route.post('sessions', 'SessionController.store').validator('Session/Store')
Route.get('sessions', 'SessionController.show').validator('Session/Show')

// Route.group(() => {
Route.put('users/:id', 'UserController.update').validator('User/Update')
Route.get('technologies', 'TechnologyController.index')
Route.post('technologies', 'TechnologyController.store').validator(
  'Technology/Store'
)
Route.post('files', 'FileController.store')
Route.get('/files/:id', 'FileController.show')
// }).middleware(['auth'])

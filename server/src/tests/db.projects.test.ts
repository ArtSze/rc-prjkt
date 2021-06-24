import db from './utils/dbConfig'
// import Project from '../../models/tag'

//TODO: create mock project data

describe.skip('Tag database tests', () => {

  beforeEach(async () => { await db.connect() })

  describe('GET /projects/:projectid', () => {

    it.todo('should return a 200 status code and a response containing the project data')
    it.todo('should return a 404 status code and for an invalid project')

  })

  describe('POST /projects/:projectid', () => {

    it.todo('should return a 201 status code and valid response for creation of a valid project')
    it.todo('should return a 500 status code and error response for creation of an invalid project')

  })

  describe('PUT /projects/:projectid', () => {

    it.todo('should return a 200 status code and valid response for updating a valid project when adding a tag')
    it.todo('should return a 200 status code and valid response for updating a valid project when removing a tag')
    it.todo('should return a 500 status code and valid response for updating a valid project when removing a tag that doesn\'t exist')
    it.todo('should return a 200 status code and valid response for updating a valid project when changing the active status')
    it.todo('should return a 200 status code and valid response for updating a valid project when adding a collaborator')
    it.todo('should return a 200 status code and valid response for updating a valid project when removing a collaborator')
    it.todo('should return a 200 status code and valid response for updating a valid project when adding github link')
    it.todo('should return a 500 status code and valid response for updating a valid project when removing a collaborator that doesn\'t exist')
    it.todo('should return a 500 status code and valid response for updating a valid project with a description longer than 240 characters')
    it.todo('should return a 500 status code and valid response for updating a valid project with a description shorter than 20 characters')
    it.todo('should return a 500 status code and error response for updating an invalid project')

  })


  afterEach(async () => { await db.close() })
})
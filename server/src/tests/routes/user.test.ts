import express from 'express'
import supertest from 'supertest'
import { UsersRouter } from '../../routes/users'
import db from '../utils/dbConfig'

const app = express()
const api = supertest(app)
app.use(UsersRouter)

describe('User Router tests without using app', () => {

  // TODO: copy from projects tests when routes are complete

  beforeAll(async () => { await db.connect() })
  afterAll(async () => { await db.close() })

  describe('POST /user', () => {
    it('should return a 201 status code and valid response for creation of a valid user',
      async () => {
        const result = await api.post('/')
          .send({ rcId: '1234' })
        expect(result.statusCode).toEqual(201)
        expect(result.body).toEqual(
          {
            'rcId': '1234',
            'ownedPosts': [],
            'collabPosts': []
          }
        )
      })

    it('should return a 500 status code and error response for creation of an invalid user',
      async () => {
        const result = await api.post('/')
          .send({ 'test': '' })
        expect(result.statusCode).toEqual(400)
        expect(result.body).toEqual({ error: 'Invalid user' })
      })
  })

  describe('GET /user', () => {
    it('should return a 404 as an invalid route',
      async () => {
        const result = await api.get('/')
        expect(result.statusCode).toEqual(404)
      })

    it('should return a 200 status code and a response containing the user object for a valid user',
      async () => {
        const result = await api.get('/1234')
        expect(result.statusCode).toEqual(200)
        expect(result.body).toEqual('TODO [GET] get all user projects')
      })

    it('should return a 404 status code and for an invalid user',
      async () => {
        const result = await api.get('/9999999')
        expect(result.statusCode).toEqual(404)
      })
  })

})
import { app } from '../app'
import db from './utils/dbConfig'
import supertest from 'supertest'

const api = supertest(app)

describe('User tests with app and middleware', () => {

  beforeAll(async () => { await db.connect() })
  afterAll(async () => { await db.close() })

  describe('GET /user', () => {
    it('should return a 404 as an invalid route',
      async () => {
        const result = await api.get('/user')
        expect(result.statusCode).toEqual(404)
      })
  })

  describe('POST /user', () => {
    it('should return a 201 status code and valid response for creation of a valid user',
      async () => {
        const result = await api.post('/user')
          .send({ 'rcId': '1234' })
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
        const result = await api.post('/user')
          .send({ test: '' })
        expect(result.statusCode).toEqual(500)
        expect(result.body).toEqual({ error: 'Invalid user' })
      })
  })

  describe('GET /user/:userid', () => {

    it('should return a 201 status code and a response containing the user object for a valid user',
      async () => {
        const result = await api.get('/user/1234')
        expect(result.statusCode).toEqual(200)
        console.log(result.body)
        expect(result.body).toEqual(
          {
            'rcId': '1234',
            'ownedPosts': [],
            'collabPosts': []
          }
        )
      })

    it('should return a 404 status code and for an invalid user',
      async () => {
        const result = await api.get('/user/9999999')
        expect(result.statusCode).toEqual(404)
      })
  })


})

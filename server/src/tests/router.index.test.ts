import express from 'express'
import supertest from 'supertest'
import db from './utils/dbConfig'

const app = express()
const api = supertest(app)

describe.skip('Index Router tests without using app', () => {

  beforeAll(async () => { await db.connect() })
  afterAll(async () => { await db.close() })

  describe.skip('GET /', () => {

    it('should return a 200 status code and a response containing all projects in the database',
      async () => {
        const result = await api.get('/')
        expect(result.statusCode).toEqual(200)
        // TODO
        expect(result.body).toEqual('TODO [GET] get all projects')
      })

  })

})
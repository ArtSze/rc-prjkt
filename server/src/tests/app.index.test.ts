import { app } from '../app'
import db from './utils/dbConfig'
import supertest from 'supertest'

const api = supertest(app)

describe.skip('Index tests with app and middleware', () => {

  beforeEach(async () => { await db.connect() })

  describe.skip('GET /', () => {

    it('should return a 200 status code and a response containing all projects in the database',
      async () => {
        const result = await api.get('/')
        expect(result.statusCode).toEqual(200)
        // TODO
        expect(result.body).toEqual('TODO [GET] get all projects')
      })

  })

  afterEach(async () => { await db.close() })
})
import express from 'express'
import supertest from 'supertest'
import db from './utils/dbConfig'

const app = express()
const api = supertest(app)

console.log({ api })

describe.skip('Index Router tests without using app', () => {

  beforeEach(async () => { await db.connect() })

  // TODO: copy from index tests when routes are complete

  afterEach(async () => { await db.close() })
})
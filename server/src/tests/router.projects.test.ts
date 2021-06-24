import express from 'express'
import supertest from 'supertest'
import { ProjectsRouter } from '../routes/projects'
import db from './utils/dbConfig'

const app = express()
const api = supertest(app)
app.use(ProjectsRouter)

console.log({ api })

describe.skip('Projects Router tests without using app', () => {

  beforeEach(async () => { await db.connect() })

  // TODO: copy from projects tests when routes are complete

  afterEach(async () => { await db.close() })
})
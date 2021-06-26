import db from './utils/dbConfig'
import User from '../models/user'

describe('User database tests', () => {

  beforeAll(async () => { await db.connect() })
  afterAll(async () => { await db.close() })

  it('should a create new user', async () => {
    const user = new User({ rcId: 1234 })
    const response = await user.save()
    return expect(response).toEqual(
      expect.objectContaining({ 'rcId': 1234 }),
    )
  })

  it('should fail to create new user with an rcId that is not a string', async () => {
    async function createUser() {
      const user = new User({ 'rcId': true })
      const response = await user.save()
      return response
    }
    return expect(createUser).rejects.toThrow('User validation failed')
  })

  it('should fail to create new user with an rcId that is undefined', async () => {
    async function newUser() {
      const user = new User({ rcId: undefined })
      const response = await user.save()
      return response
    }
    return expect(newUser).rejects.toThrow('User validation failed')
  })

  it('should fail to create new user with an rcId that is null', async () => {
    async function newUser() {
      const user = new User({ rcId: null })
      const response = await user.save()
      return response
    }
    return expect(newUser).rejects.toThrow('User validation failed')
  })

})
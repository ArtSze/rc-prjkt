import db from './utils/dbConfig'
import User from '../models/user'

describe('User database tests', () => {

  /* There are no tests for updating or deleting a user since these are not required for this app */

  beforeEach(async () => { await db.connect() })

  it('should a create new user', async () => {
    const user = new User({ rcId: '1234' })
    console.log({ user })
    await user.save()
    expect.objectContaining({ 'rcId': '1234' })
    expect.objectContaining({ 'ownedPosts': undefined })
    expect.objectContaining({ 'collabPosts': undefined })
  })

  it('should fail to create new user with an rcId that is not a string', async () => {
    const user = new User({ rcId: true })
    console.log({ user })
    await user.save()
    expect.objectContaining({ 'rcId': 1234 })
    expect.objectContaining({ 'ownedPosts': undefined })
    expect.objectContaining({ 'collabPosts': undefined })
  })

  it('should fail to create new user with an rcId that is undefined', async () => {
    const user = new User({ rcId: undefined })
    await user.save()
    expect.objectContaining({ 'rcId': false })
    expect.objectContaining({ 'ownedPosts': undefined })
    expect.objectContaining({ 'collabPosts': undefined })
  })

  it('should fail to create new user with an rcId that is null', async () => {
    const user = new User({ rcId: null })
    await user.save()
    expect.objectContaining({ 'rcId': false })
    expect.objectContaining({ 'ownedPosts': undefined })
    expect.objectContaining({ 'collabPosts': undefined })
  })

  afterEach(async () => { await db.close() })
})
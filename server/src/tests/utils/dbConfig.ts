import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

const db = new MongoMemoryServer()

async function connect() {
  const uri = await db.getUri()
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

async function close() {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await db.stop()
}

export default { connect, close }
import { app } from './app'
import logger from './utils/logger'
import { PORT } from './utils/config'
import mongoose from 'mongoose'
import { MONGO_URI } from './utils/config'

async function runServer() {
  await mongoose.connect(`${MONGO_URI}`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => logger.info('MongoDB database connection established successfully'))
    .catch((error) => logger.error(`MongoDB connection error: ${error}`))

  app.listen(PORT, () => { logger.info(`Server running on port ${PORT}`) })
}

runServer()
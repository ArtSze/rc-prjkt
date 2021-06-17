import 'dotenv/config'

export const PORT = process.env['PORT']

// Mongo Config
export const MONGO_URI = (process.env['NODE_ENV'] === 'test')
  ? process.env['TEST_MONGO_URI']
  : process.env['MONGO_URI']

// OAuth Config
export const id = process.env['RC_AUTH_ID']
export const secret = process.env['RC_AUTH_SECRET']
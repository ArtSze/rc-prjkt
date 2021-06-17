import 'dotenv/config'

export const MONGO_URI = (process.env['NODE_ENV'] === 'test')
  ? process.env['TEST_MONGO_URI']
  : process.env['MONGO_URI']

export const PORT = process.env['PORT']
export const SECRET = process.env['SECRET']
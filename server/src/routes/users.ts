import Router from 'express'
import logger from '../utils/logger'

export const UsersRouter = Router()

UsersRouter.get('/:userid', (req, res) => {
  const reqBody = req.body
  logger.info({ reqBody })
  res.status(200).json('TODO [GET] get all user projects')
})
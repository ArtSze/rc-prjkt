import Router from 'express'
import logger from '../utils/logger'

export const UserRouter = Router()

UserRouter.get('/', (req, res) => {
  const reqBody = req.body
  logger.info({ reqBody })
  res.status(200).json('TODO [GET] get all user projects')
})

UserRouter.get('/:projectid', (req, res) => {
  const reqBody = req.body
  logger.info({ reqBody })
  res.status(200).json('TODO [GET] get single project')
})

UserRouter.post('/', (req, res) => {
  const reqBody = req.body
  logger.info({ reqBody })
  res.status(200).json('TODO [POST] new user project')
})

UserRouter.delete('/:projectid', (req, res) => {
  const reqBody = req.body
  logger.info({ reqBody })
  res.status(200).json('TODO [DELETE] remove user project')
})

UserRouter.put('/:projectid', (req, res) => {
  const reqBody = req.body
  logger.info({ reqBody })
  res.status(200).json('TODO [PUT] update user project')
})
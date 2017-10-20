import { Router } from 'express'

const router = Router()

router.get('/groups', function (req, res, next) {
  res.json('groups')
})

export default router

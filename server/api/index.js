import { Router } from 'express'

import auth from './auth'
import users from './users'
import groups from './groups'

const router = Router()

router.use(auth)
router.use(users)
router.use(groups)

export default router

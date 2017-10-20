import { Router } from 'express'
import controller from '../controllers/auth'

const router = Router()

router.post('/auth/login', controller.login)
router.post('/auth/logout', controller.logout)

export default router

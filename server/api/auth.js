import { Router } from 'express'
import controller from '../controllers/auth'

const router = Router()

router.post('/auth', controller.login)
router.delete('/auth', controller.logout)

export default router

import { Router } from 'express'
import controller from '../controllers/users'

const router = Router()

router.get('/users', controller.get)
router.post('/users', controller.create)
router.put('/users', controller.update)
router.delete('/users/:userId', controller.remove)

export default router

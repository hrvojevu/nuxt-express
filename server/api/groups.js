import { Router } from 'express'
import controller from '../controllers/groups'

const router = Router()

router.get('/groups', controller.get)
router.post('/groups', controller.create)
router.put('/groups', controller.update)
router.delete('/groups', controller.remove)

export default router

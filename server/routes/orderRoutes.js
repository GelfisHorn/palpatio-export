import express from 'express'
import checkAuth from '../middleware/checkAuth.js'
import checkAdmin from '../middleware/checkAdmin.js'
import { getAll, getById, create, changeStatus } from '../controllers/orderController.js'

const router = express.Router()

router.get('/', checkAuth, checkAdmin, getAll) // Get all orders
router.get('/:id', checkAuth, checkAdmin, getById) // Get order by id

router.post('/', create) // Create new order
router.put('/:id', checkAuth, checkAdmin, changeStatus) // Change order status

export default router
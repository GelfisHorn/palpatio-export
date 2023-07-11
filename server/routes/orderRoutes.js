import express from 'express'
import checkAuth from '../middleware/checkAuth.js'
import { getAll, getById, create } from '../controllers/orderController.js'

const router = express.Router()

router.get('/', checkAuth, getAll) // Get all orders
router.get('/:id', checkAuth, getById) // Get order by id

router.post('/', create) // Create new order

export default router
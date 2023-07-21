import express from 'express'
import checkAuth from '../middleware/checkAuth.js'
import checkAdmin from '../middleware/checkAdmin.js'
import { getAll, getById, create } from '../controllers/boxOrderController.js'

const router = express.Router()

// Box order
router.get('/:id', checkAuth, checkAdmin, getById);
router.route('/')
    .get(checkAuth, checkAdmin, getAll)
    .post(create);

export default router;
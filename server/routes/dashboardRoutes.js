import express from 'express'
// Middlewares
import checkAuth from '../middleware/checkAuth.js'
import checkAdmin from '../middleware/checkAdmin.js'
// Controllers
import dashboard from '../controllers/dashboard/index.js'

const router = express.Router()

// Clients
router.get('/clients/:id', checkAuth, checkAdmin, dashboard.clients.getById)
router.route('/clients')
    .post(dashboard.clients.create)
    .get(checkAuth, checkAdmin, dashboard.clients.getAll);
router.post('/clients/assignOrder', checkAuth, checkAdmin, dashboard.clients.assignOrder);
// Client
router.route('/client/:id')
    .get(checkAuth, dashboard.client.getOrders)

export default router;
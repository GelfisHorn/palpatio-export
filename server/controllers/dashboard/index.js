import * as clients from './clientsController.js';
import * as client from './clientController.js';

const dashboard = {
    clients: {
        getById: clients.getById,
        getAll: clients.getAll,
        create: clients.create,
        assignOrder: clients.assignOrder
    },
    client: {
        getOrders: client.getOrders
    }
}

export default dashboard;
import * as clients from './clientsController.js';
import * as client from './clientController.js';

const dashboard = {
    clients: {
        getById: clients.getById,
        getAll: clients.getAll,
        create: clients.create
    },
    client: {
        getOrders: client.getOrders
    }
}

export default dashboard;
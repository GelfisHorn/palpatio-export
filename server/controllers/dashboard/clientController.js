
// Models
import ClientOrder from "../../models/ClientOrder.js"
// Permissions
import PERMISSIONS from "../../config/permissions.js";
// Locales
import locales from '../../locales/controllers/dashboard/client.js'

const getOrders = async (req, res) => {
    const { id } = req.params;
    const user = req.user;

    if(![PERMISSIONS.admin, PERMISSIONS.client].includes(user?.permissions)) {
        const error = new Error(locales.EN.errors.permissions);
        return res.status(403).json({ msg: error.message });
    }

    try {
        const orders = await ClientOrder.find({ client: id }).populate('order').select('order');
        return res.status(200).json(orders);
    } catch (err) {
        const error = new Error(locales.EN.errors.getOrdersCatch);
        return res.status(500).json({ msg: error.message });
    }
}

export {
    getOrders
}
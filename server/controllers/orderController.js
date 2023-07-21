import mongoose from "mongoose";
// Models
import Order from "../models/Order.js";
// Config
import ORDER_STATUS from "../config/orderStatus.js";
// Locales
import locales from '../locales/controllers/order.js'

const ObjectId = mongoose.Types.ObjectId;

const getAll = async (req, res) => {
    try {
        const orders = await Order.find();
        return res.status(200).json(orders)
    } catch (err) {
        const error = new Error('There was a mistake getting the order')
        return res.status(404).json({ msg: error.message, success: false })
    }
}

const getById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const order = await Order.findById(id);
        if(!order) {
            const error = new Error("This order does not exists")
            return res.status(404).json({ msg: error.message, success: false })
        }
        return res.status(200).json(order)
    } catch (err) {
        const error = new Error('There was a mistake getting the order')
        return res.status(404).json({ msg: error.message, success: false })
    }
}

const create = async (req, res) => {
    const order = req.body || {};
    const { fromCountry, items, shipping, contact } = order || {}

    // Validations
    if(!order) {
        const error = new Error('You must send an object')
        return res.status(400).json({ msg: error.message, success: false })
    }
    if (!fromCountry || !items || !shipping || !contact) {
        const error = new Error('"fromCountry", "items", "shipping", "contact" are required')
        return res.status(400).json({ msg: error.message, success: false })
    }
    const { name, email, phoneNumber } = contact || {};
    if(!name || !email || !phoneNumber) {
        const error = new Error('"contact.name", "contact.email", "contact.phoneNumber" are required')
        return res.status(400).json({ msg: error.message, success: false })
    }

    try {
        const newOrder = new Order({ fromCountry, items, shipping, contact });
        await newOrder.save();
        // TODO: Verificar si hay un usuario con el email de la orden y asignarlo al mismo.
        return res.status(200).json({ success: true })
    } catch (err) {
        console.log(err)
        const error = new Error('There was a mistake creating the order')
        return res.status(404).json({ msg: error.message, success: false })
    }
}

const changeStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body || {};

    if(!ObjectId.isValid(id)) {
        const error = new Error(locales.EN.errors.id);
        return res.status(403).json({ msg: error.message });
    }

    const order = await Order.findById(id);
    if(!order) {
        const error = new Error(locales.EN.errors.findOrder);
        return res.status(403).json({ msg: error.message });
    }
    if(order.status == status) {
        const error = new Error(locales.EN.errors.sameStatus);
        return res.status(403).json({ msg: error.message });
    }

    if(!Object.keys(ORDER_STATUS).includes(status)) {
        const error = new Error(locales.EN.errors.invalidStatus);
        return res.status(403).json({ msg: error.message });
    }

    try {
        order.status = status;
        await order.save();
        return res.status(200).json({ msg: locales.EN.success.changeStatus });
    } catch (err) {
        const error = new Error(locales.EN.errors.catch);
        return res.status(403).json({ msg: error.message });
    }
}

export {
    getAll,
    getById,
    create,
    changeStatus
}
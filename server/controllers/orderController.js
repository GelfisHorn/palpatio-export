import Order from "../models/Order.js";

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
        console.log(order)
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
    const { fromCountry, items, shipping } = order || {}

    // Validations
    if(!order) {
        const error = new Error('You must send an object')
        return res.status(400).json({ msg: error.message, success: false })
    }
    if (!fromCountry || !items || !shipping) {
        const error = new Error('"fromCountry", "items", "shipping" are required')
        return res.status(400).json({ msg: error.message, success: false })
    }

    try {
        const newOrder = new Order(order);
        await newOrder.save();
        return res.status(200).json({ success: true })
    } catch (err) {
        console.log(err)
        const error = new Error('There was a mistake creating the order')
        return res.status(404).json({ msg: error.message, success: false })
    }
}

export {
    getAll,
    getById,
    create
}
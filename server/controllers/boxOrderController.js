import BoxOrder from "../models/BoxOrder.js";
// Locales
import locales from '../locales/controllers/order.js'

const getAll = async (req, res) => {
    try {
        const boxes = await BoxOrder.find();
        return res.status(200).json(boxes)
    } catch (err) {
        const error = new Error('There was a mistake getting the boxes orders')
        return res.status(404).json({ msg: error.message, success: false })
    }
}

const getById = async (req, res) => {
    const { id } = req.params;

    try {
        const boxes = await BoxOrder.findById(id);
        if (!boxes) {
            const error = new Error("This box order does not exists")
            return res.status(404).json({ msg: error.message, success: false })
        }
        return res.status(200).json(boxes)
    } catch (err) {
        const error = new Error('There was a mistake getting the box order')
        return res.status(404).json({ msg: error.message, success: false })
    }
}

const create = async (req, res) => {
    const { fullName, email, phoneNumber, amount } = req.body || {};

    if (!fullName || !email || !phoneNumber || !amount || amount <= 0) {
        return res.status(400).json({ msg: locales.EN.errors.boxFields });
    }

    try {
        const newBox = new BoxOrder({ fullName, email, phoneNumber, amount });
        await newBox.save();
        return res.status(200).json({ msg: locales.EN.success.createBox });
    } catch (err) {
        const error = new Error(locales.EN.errors.createBoxCatch);
        return res.status(500).json({ msg: error.message });
    }
}

export {
    getAll,
    getById,
    create
}
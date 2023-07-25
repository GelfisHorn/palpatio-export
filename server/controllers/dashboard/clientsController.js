import mongoose from "mongoose";
// Modals
import User from "../../models/User.js";
import Order from "../../models/Order.js";
import ClientOrder from "../../models/ClientOrder.js";
// Config
import PERMISSIONS from "../../config/permissions.js";
// Hooks
import sendRegisterMail from "../../hooks/confirm/sendMail.js"
// Helpers
import createToken from "../../helpers/createToken.js";
// Locales
import locales from "../../locales/controllers/dashboard/index.js";

const ObjectId = mongoose.Types.ObjectId;
const getAll = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = 10;

        const totalUsers = await User.countDocuments({ permissions: "client" });
        const totalPages = Math.ceil(totalUsers / perPage);

        const users = await User.find({ permissions: "client" }).skip((page - 1) * perPage).limit(perPage);

        return res.json({
            users,
            page,
            totalPages
        });
    } catch (err) {
        const error = new Error(locales.clients.EN.errors.getAllCatch);
        return res.status(500).json({ msg: error.message });
    }
}

const getById = async (req, res) => {
    const { id } = req.params;

    Promise.all([
        User.findById(id).select('-__v -updatedAt -token -password'),
        ClientOrder.find({ client: id }).populate('order').select('order')
    ])
    .then(response => {
        const client = response[0];
        const orders = response[1];
        if (!client) {
            const error = new Error("This client does not exists")
            return res.status(404).json({ msg: error.message, success: false })
        }
        if (client.permissions != PERMISSIONS.client) {
            const error = new Error("This user is not a client")
            return res.status(404).json({ msg: error.message, success: false })
        }
        return res.status(200).json({ client, orders });
    })
    .catch(err => {
        console.log(err)
        const error = new Error('There was a mistake getting the client')
        return res.status(404).json({ msg: error.message, success: false })
    });
}

const create = async (req, res) => {
    const { name, surname, email, password } = req.body || {};

    const emailExist = await User.findOne({ email })
    if (emailExist) {
        const error = new Error('Email already exists')
        return res.status(400).json({ msg: error.message, success: false });
    }

    if (!name || !surname || !email || !password) {
        return res.status(400).json({ msg: 'Some fields are missing', success: false });
    }

    
    try {
        const user = new User({ name, surname, email, password });
        const token = createToken();
        user.token = token;
        user.permissions = PERMISSIONS.client;
        await user.save();
        
        const orders = await Order.find({ "contact.email": email });
        if (orders.length != 0) {
            for (let i = 0; i < orders.length; i++) {
                const newClientOrder = new ClientOrder({ client: user._id, order: orders[i]._id });
                newClientOrder.save();
            }
        }

        sendRegisterMail({ email, token });
        return res.status(200).json({ _id: user._id, name: user.name, surname: user.surname, email: user.email });
    } catch (err) {
        const error = new Error('There was an error creating account')
        return res.status(403).json({ msg: error.message, success: false })
    }
}

const assignOrder = async (req, res) => {
    const { userId, orderId } = req.body || {};

    if (!ObjectId.isValid(orderId) || !ObjectId.isValid(userId)) {
        return res.status(400).json({ msg: { EN: locales.clients.EN.errors.assignOrderId, ES: locales.clients.ES.errors.assignOrderId }, success: false });
    }

    try {
        const user = await User.findById(userId);
        if(!user) {
            return res.status(400).json({ msg: { EN: locales.clients.EN.errors.assignOrderUser, ES: locales.clients.ES.errors.assignOrderUser }, success: false });
        }
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(400).json({ msg: { EN: locales.clients.EN.errors.assignOrderOrder, ES: locales.clients.ES.errors.assignOrderOrder }, success: false });
        }
        const newClientOrder = new ClientOrder({ client: user._id, order: order._id });
        await newClientOrder.save();
        newClientOrder.on('error', (err) => {
            console.log(err)
            return res.status(403).json({ msg: { EN: locales.clients.EN.errors.assignOrderCatch, ES: locales.clients.ES.errors.assignOrderCatch }, success: false })
        });
        const response = await newClientOrder.populate('order');
        return res.status(200).json({ _id: response._id, order: response.order });
    } catch (err) {
        console.log(err)
        return res.status(403).json({ msg: { EN: locales.clients.EN.errors.assignOrderAlreadyAssigned, ES: locales.clients.ES.errors.assignOrderAlreadyAssigned }, success: false })
    }
}

export {
    getById,
    getAll,
    create,
    assignOrder
}
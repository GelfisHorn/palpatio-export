// Modals
import User from "../../models/User.js";
// Config
import PERMISSIONS from "../../config/permissions.js";
// Hooks
import sendRegisterMail from "../../hooks/confirm/sendMail.js"
// Helpers
import createToken from "../../helpers/createToken.js";
// Locales
import locales from "../../locales/controllers/dashboard/index.js";

const getAll = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = 10;

        const totalUsers = await User.countDocuments();
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

    try {
        const client = await User.findById(id);
        if (!client) {
            const error = new Error("This client does not exists")
            return res.status(404).json({ msg: error.message, success: false })
        }
        if(client.permissions != PERMISSIONS.client) {
            const error = new Error("This user is not a client")
            return res.status(404).json({ msg: error.message, success: false })
        }
        return res.status(200).json(order)
    } catch (err) {
        const error = new Error('There was a mistake getting the client')
        return res.status(404).json({ msg: error.message, success: false })
    }
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
        // TODO: Verificar si hay ordenes con el email del usuario y asignarlas al mismo.
        sendRegisterMail({ email, token });
        res.status(200).json({ success: true });
    } catch (err) {
        const error = new Error('There was an error creating account')
        return res.status(403).json({ msg: error.message, success: false })
    }
}

export {
    getById,
    getAll,
    create
}
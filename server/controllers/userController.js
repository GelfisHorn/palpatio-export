import mongoose from "mongoose"
// Models
import User from "../models/User.js"
import Order from "../models/Order.js"
import ClientOrder from '../models/ClientOrder.js'
// Helpers
import createToken from "../helpers/createToken.js"
import createJWT from '../helpers/createJWT.js'
// Hooks
import sendRegisterMail from "../hooks/confirm/sendMail.js"
import sendResetPassMail from "../hooks/resetPassword/sendMail.js"
// Locales
import locales from '../locales/controllers/user.js'

const ObjectId = mongoose.Types.ObjectId;

const register = async (req, res) => {
    const { email, name, surname, password } = req.body

    const emailExist = await User.findOne({ email })

    if (emailExist) {
        const error = new Error('Email already exists')
        return res.status(400).json({ msg: error.message, success: false });
    }

    if (!email || !name || !surname || !password) {
        return res.status(400).json({ msg: 'Some fields are missing', success: false });
    }
    
    try {
        const user = new User({ name, surname, email, password });
        const token = createToken();
        user.token = token;
        await user.save();

        const orders = await Order.find({ "contact.email": email });
        if(orders.length != 0) {
            for(let i = 0; i < orders.length; i++) {
                const newClientOrder = new ClientOrder({ client: user._id, order: orders[i]._id });
                newClientOrder.save();
            }
        }

        sendRegisterMail({ email, token })
        res.status(200).json({ success: true });
    } catch (err) {
        const error = new Error('There was an error creating account')
        return res.status(403).json({ msg: error.message, success: false })
    }
}

const authenticate = async (req, res) => {
    const { email, password } = req.body

    if (!password) {
        return res.status(404).json({ msg: '"password" is required', success: false })
    }

    // Check if user exists
    const user = await User.findOne({ email })
    if (!user) {
        const error = new Error('User not exists')
        return res.status(404).json({ msg: error.message, success: false })
    }
    // Check if user is confiremd
    if (!user.confirmed) {
        const error = new Error('Account not confirmed')
        return res.status(400).json({ msg: error.message, success: false })
    }
    /* Check if user account is disabled */
    if (user.disabled) {
        const error = new Error('This account are disabled')
        return res.status(403).json({ msg: error.message, success: false })
    }

    if (await user.checkPassword(password)) {
        return res.json({
            _id: user._id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            token: createJWT(user._id),
            wallet: user.wallet
        })
    } else {
        const error = new Error('Wrong password')
        return res.status(403).json({ msg: error.message, success: false })
    }
}

const confirm = async (req, res) => {
    const { token } = req.params

    const user = await User.findOne({ token })
    if (!user) {
        const error = new Error('Invalid token')
        return res.status(404).json({ msg: error.message, success: false })
    }

    try {
        user.confirmed = true
        user.token = ''
        await user.save()
        return res.status(200).json({ success: true })
    } catch (error) {
        return res.status(404).json({ success: false })
    }
}

const resetPassword = async (req, res) => {
    const { email } = req.body

    const user = await User.findOne({ email })
    if (!user) {
        const error = new Error('Invalid email')
        return res.status(404).json({ msg: error.message, success: false })
    }

    try {
        const token = createToken();
        user.token = token;
        await user.save()
        sendResetPassMail({ email, token });
        return res.json({ success: true })
    } catch (error) {
        return res.json({ success: false })
    }
}

const checkToken = async (req, res) => {
    const { token } = req.params

    const user = await User.findOne({ token })
    if (!user) {
        const error = new Error('Invalid token')
        return res.status(404).json({ msg: error.message, success: false })
    }
    return res.json({ success: true })
}

const newPassword = async (req, res) => {
    const { token } = req.params
    const { password } = req.body

    const user = await User.findOne({ token })
    if (!user) {
        const error = new Error('Invalid token')
        return res.status(404).json({ msg: error.message, success: false })
    }

    user.password = password
    user.token = ''
    try {
        await user.save()
        return res.json({ success: true })
    } catch (error) {
        return res.json({ success: false })
    }
}

const profile = async (req, res) => {
    const { user } = req;

    return res.json(user)
}

const editProfile = async (req, res) => {
    const { _id } = req.user;
    const { name, surname, email, currentPassword, password } = req.body

    if(!ObjectId.isValid(_id)) {
        return res.status(404).json({ msg: "Not valid user id" })
    }

    let user = {};
    try {
        user = await User.findOne({ _id })
    } catch (error) {
        return res.status(404).json({ msg: "User doesn't exists" })
    }

    if(password) {
        const checkPassword = await user.checkPassword(currentPassword);
        if(!checkPassword) {
            return res.status(403).json({ msg: {
                en: locales.EN.editProfile.wrongPassword,
                es: locales.ES.editProfile.wrongPassword
            }});
        }
    }

    try {
        if(name) user.name = name;
        if(surname) user.surname = surname;
        if (email) user.email = email;
        if (password) user.password = password;
        await user.save()
        return res.status(200).json({ success: true, msg: "Account edited successfully" })
    } catch (error) {
        return res.status(500).json({ success: false })
    }
}

const disable = async (req, res) => {
    const { _id } = req.body

    if (String(_id).match(/^[0-9a-fA-F]{24}$/)) {
        const user = await User.findOne({ _id })
        if (user) {
            user.disabled = true
            try {
                await user.save()
                return res.json({ success: true })
            } catch (error) {
                return res.json({ success: false })
            }
        }
    }
}

export {
    register,
    authenticate,
    confirm,
    resetPassword,
    checkToken,
    newPassword,
    profile,
    editProfile,
    disable
}
import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import PERMISSIONS from "../config/permissions.js";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    surname: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    token: {
        type: String
    },
    permissions: {
        type: String,
        enum: Object.values(PERMISSIONS),
        default: PERMISSIONS.client
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.checkPassword = async function (formPassword) {
    return await bcrypt.compare(formPassword, this.password)
}

const User = mongoose.model('User', userSchema)

export default User
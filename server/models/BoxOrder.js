import mongoose from "mongoose";
import STATUS from '../config/orderStatus.js'

const boxOrderSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        default: 1
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(STATUS),
        default: STATUS.onhold
    }
}, {
    timestamps: true
})

const BoxOrder = mongoose.model('BoxOrder', boxOrderSchema)

export default BoxOrder
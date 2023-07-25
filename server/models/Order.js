import mongoose from "mongoose";
import STATUS from '../config/orderStatus.js'

const orderSchema = mongoose.Schema({
    fromCountry: {
        type: String,
        required: true,
        enum: ['CH', 'FR', 'AT', 'BE', 'NL', 'LU', 'DE']
    },
    items: [
        {
            type: {
                type: String,
                trim: true,
                required: true
            },
            category: {
                type: String,
                trim: true
            },
            content: {
                type: String
            },
            images: [String]
        }
    ],
    shipping: {
        from: {
            fullName: {
                type: String,
                required: true
            },
            street: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            zipCode: {
                type: Number,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            phoneNumber: {
                type: Number,
                required: true
            }
        },
        to: {
            fullName: {
                type: String,
                required: true
            },
            street: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            zipCode: {
                type: Number,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            phoneNumber: {
                type: Number,
                required: true
            },
            ci: {
                type: Number,
                required: true
            }
        },
        note: {
            type: String
        },
    },
    contact: {
        name: {
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
        }
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

const Order = mongoose.model('Order', orderSchema)

export default Order
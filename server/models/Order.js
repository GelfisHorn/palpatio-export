import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    fromCountry: {
        type: String,
        required: true,
        enum: ['CH', 'FR', 'AT', 'BE', 'NL', 'LU']
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
            amount: {
                type: Number,
                min: 1,
                max: 10,
                required: true
            },
            weight: {
                type: Number,
                min: 1
            },
            width: {
                type: Number,
                min: 1,
                max: 500
            },
            length: {
                type: Number,
                min: 1,
                max: 500
            },
            height: {
                type: Number,
                min: 1,
                max: 500
            },
            content: {
                type: String,
                required: true
            },
            value: {
                type: Number,
                min: 1,
                required: true
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
        }
    },
    total: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

const Order = mongoose.model('Order', orderSchema)

export default Order
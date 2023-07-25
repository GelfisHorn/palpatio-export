import mongoose from "mongoose";

const clientOrderSchema = mongoose.Schema({
    client: {
        required: true,
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    order: {
        required: true,
        unique: true,
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Order',
    }
}, {
    timestamps: true
})

const ClientOrder = mongoose.model('ClientOrder', clientOrderSchema)

export default ClientOrder
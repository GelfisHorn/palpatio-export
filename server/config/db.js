import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        const url = `${connection.connection.host}:${connection.connection.port}`
        console.log(`Connection established: ${url}`)
    } catch (error) {
        process.exit(1)
    }
}

export default connectDB
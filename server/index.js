import express from 'express'
import dotenv from 'dotenv'
import connectDB from "./config/db.js";
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import boxOrderRoutes from './routes/boxOrderRoutes.js'
import dashboardRoutes from './routes/dashboardRoutes.js'

const app = express();
app.use(express.json());

dotenv.config();
connectDB();

/* Routing */
app.use('/v1/users', userRoutes);
app.use('/v1/order', orderRoutes);
app.use('/v1/order-box', boxOrderRoutes);
app.use('/v1/dashboard', dashboardRoutes);

const PORT = process.env.PORT || 4000
const server = app.listen(PORT, () => {
    console.log(`Server running in port: ${PORT}`)
});
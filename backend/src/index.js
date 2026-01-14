import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { globalErrorHandler } from './middlewares/errorHandler.js';
import authRoutes from './routes/auth.route.js';

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());


// routes
app.get('/health' , (req , res) => {
    res.json({ satus : "OK" });
});

app.use('/api/auth', authRoutes);


app.use(globalErrorHandler);

const PORT = process.env.PORT;
app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`);
})
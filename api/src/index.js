import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { globalErrorHandler } from './middlewares/errorHandler.js';
import { initScheduler } from './jobs/scheduler.js';
import authRoutes from './routes/auth.route.js';
import adminRoutes from './routes/admin.route.js';
import userRoutes from './routes/user.route.js';
import squadRoutes from './routes/squad.route.js';
import postRoutes from './routes/post.route.js';
import engagementRoutes from './routes/engagement.route.js';

dotenv.config();

connectDB();

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());


// routes
app.get('/health' , (req , res) => {
    res.json({ satus : "OK" });
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/squads', squadRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/engagement', engagementRoutes);


app.use(globalErrorHandler);

// Initialize scheduled jobs
initScheduler();

const PORT = process.env.PORT;
app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`);
})

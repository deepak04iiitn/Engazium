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
import testimonialRoutes from './routes/testimonial.route.js';
import growthRoutes from './routes/growth.route.js';

dotenv.config();

connectDB();

const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());


// routes
app.get('/health' , (req , res) => {
    res.json({ satus : "OK" });
});

app.get('/api/ping', (req, res) => {
    res.status(200).send('pong');
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/squads', squadRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/engagement', engagementRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/growth', growthRoutes);


app.use(globalErrorHandler);

// Initialize scheduled jobs
initScheduler();

const PORT = process.env.PORT || 5000;
app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`);
})

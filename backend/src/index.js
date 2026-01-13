import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());


// routes
app.get('/health' , (req , res) => {
    res.json({ satus : "OK" });
});


const PORT = process.env.PORT;
app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`);
})
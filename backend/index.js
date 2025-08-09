import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"
import userRouter from "./router/user.router.js"
import emplyRouter from "./router/employee.router.js"
import projectRouter from "./router/project.router.js"
import departmentRouter from "./router/department.router.js"
import transactionRouter from "./router/transaction.router.js"
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();

// CORS configuration
const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173', 'http://127.0.0.1:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
};

app.use(cors(corsOptions));

// Increase payload limit for file uploads and large data
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

// Serve static files for uploads
app.use('/uploads', express.static('public/uploads'));

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// Routes
app.use('/api/user/', userRouter);
app.use('/api/employee/', emplyRouter);
app.use('/api/project/', projectRouter);
app.use('/api/department/', departmentRouter);
app.use('/api/transaction/', transactionRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    
    if (err.type === 'entity.too.large') {
        return res.status(413).json({
            success: false,
            message: 'Payload too large. Please reduce the size of your request.'
        });
    }
    
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.log("MongoDB connection error:", error);
});


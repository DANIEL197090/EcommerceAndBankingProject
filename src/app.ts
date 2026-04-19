import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import productRoutes from './routes/product.routes';
import externalProductRoutes from './routes/external-product.routes';
import authRoutes from './routes/auth.routes';
import uploadRoutes from './routes/upload.routes';
import walletRoutes from './routes/wallet.routes';
import transactionRoutes from './routes/transaction.routes';
import userRoutes from './routes/user.routes';
import errorMiddleware from './middleware/error.middleware';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Routes
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: 'Welcome to the Professional Simple CRUD API',
        status: 'online',
        version: '1.0.0'
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/external-products", externalProductRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/user", userRoutes);
app.use("/api/transactions", transactionRoutes);

// Error Middleware (should be last)
app.use(errorMiddleware);

export default app;

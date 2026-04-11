const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const productRoutes = require('./routes/product.routes');
const authRoutes = require('./routes/auth.routes');
const uploadRoutes = require('./routes/upload.routes');
const walletRoutes = require('./routes/wallet.routes');
const transactionRoutes = require('./routes/transaction.routes');
const errorMiddleware = require('./middleware/error.middleware');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Routes
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Professional Simple CRUD API',
        status: 'online',
        version: '1.0.0'
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/transactions", transactionRoutes);

// Error Middleware (should be last)
app.use(errorMiddleware);

module.exports = app;

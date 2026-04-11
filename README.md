# Professional Node.js CRUD API

A professional, role-based access control (RBAC) CRUD API built with Node.js, Express, and MongoDB.

## Features

- **Standardized Project Structure**: Clean separation of concerns (Models, Routes, Controllers, Middleware, Config).
- **Security**: 
  - JWT Authentication.
  - BCrypt password hashing.
  - Role-Based Access Control (RBAC) (Admin vs. User).
- **Professional Error Handling**: Global error middleware with consistent JSON responses.
- **Environment Management**: Configurable via `.env` files.
- **RESTful Best Practices**: Clean URL patterns and HTTP methods.
- **Image Upload Integration**: Powered by Cloudinary and Multer for efficient media handling.

## Getting Started

### Prerequisites

- Node.js installed.
- MongoDB connection string.

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables in `.env`:
   ```text
   DB_URL=your_mongodb_uri
   PORT=3000
   NODE_ENV=development
   JWT_SECRET=your_jwt_secret
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## API Documentation

### Auth Endpoints

- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Login and receive a JWT token.

### Media Endpoints

- `POST /api/upload`: Upload an image to Cloudinary (Requires Authentication).
  - Use `form-data` with Key: `image`, Value: `[your file]`.

### Product Endpoints

- `GET /api/products`: Get all products (Public).
- `GET /api/products/:id`: Get a single product (Public).
- `POST /api/products`: Create a product (Admin only, accepts image file).
- `PUT /api/products/:id`: Update a product (Admin only, accepts image file).
- `DELETE /api/products/:id`: Delete a product (Admin only).

*Note: For POST and PUT, use `multipart/form-data` and an 'image' field for file uploads.*

## Folder Structure

```text
src/
├── config/         # Database and server configuration
├── controllers/    # Request handlers
├── middleware/     # Auth and error handling filters
├── models/         # Mongoose models
├── routes/         # API endpoint definitions
├── app.js          # Express app setup
└── index.js        # Server entry point
```

# Back-End

This directory contains the Node.js and Express application that serves as the API for the Forever MERN E-commerce project.

## Technology Stack

- **Node.js**: A JavaScript runtime for building the server-side application.
- **Express**: A web framework for Node.js that simplifies the creation of APIs.
- **MongoDB**: A NoSQL database used to store product, user, and order data.
- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js.
- **JSON Web Token (JWT)**: Used for secure authentication of users and admins.
- **Stripe**: A payment processing platform for handling online payments.
- **Razorpay**: Another payment processing platform for handling online payments.
- **Cloudinary**: A cloud-based service for managing images and videos.
- **Multer**: A middleware for handling `multipart/form-data`, used for file uploads.
- **CORS**: A middleware to enable Cross-Origin Resource Sharing.

## Project Structure

The `Back-End` directory is structured as follows:

- **`config/`**: Contains configuration files for connecting to the database (`mongodb.js`) and Cloudinary (`cloudinary.js`).
- **`controllers/`**: Contains the business logic for handling API requests. Each controller corresponds to a specific resource (e.g., `productController.js`, `userController.js`).
- **`middleware/`**: Contains middleware functions, including authentication (`auth.js`, `adminAuth.js`) and file upload handling (`multer.js`).
- **`models/`**: Defines the Mongoose schemas for the database collections (`productModel.js`, `userModel.js`, `orderModel.js`).
- **`routes/`**: Defines the API routes and maps them to the corresponding controller functions.
- **`server.js`**: The main entry point of the application. It initializes the Express server, connects to the database, and sets up the middleware and routes.

## API Endpoints

The API provides a set of RESTful endpoints for managing products, users, carts, and orders.

### Authentication

- **User Authentication**: A JWT-based authentication system is implemented. The `authUser` middleware protects routes that require a logged-in user.
- **Admin Authentication**: A separate `adminAuth` middleware protects routes that are only accessible to administrators. This middleware checks for an `isAdmin` flag in the JWT.

### Routes

- **`productRoute.js`**: Handles operations related to products, such as creating, reading, updating, and deleting products. Admin-only routes are protected by the `adminAuth` middleware.
- **`userRoute.js`**: Manages user and admin registration and login.
- **`cartRoute.js`**: Handles shopping cart operations, such as adding, removing, and viewing cart items. These routes are protected by the `authUser` middleware.
- **`orderRoute.js`**: Manages orders, including placing orders, processing payments, and viewing order history. Some routes are for users, and some are for admins.

### Payment Processing

The application integrates with both **Stripe** and **Razorpay** to process online payments. It also supports **Cash on Delivery (COD)**.

## How to Run

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Set up environment variables**: Create a `.env` file in the `Back-End` directory and add the necessary environment variables (e.g., database connection string, JWT secret, payment gateway API keys).
3. **Start the server**:
   ```bash
   npm start
   ```
The server will start on the port specified in the environment variables (or a default port).
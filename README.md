# Forever MERN E-commerce Project

## Live Demo

You can find a live demo of the application here: [https://forever-frontend-six-phi.vercel.app/](https://forever-frontend-six-phi.vercel.app/)

This is a full-stack MERN (MongoDB, Express, React, Node.js) e-commerce application. The project is divided into three main parts:

- **`Back-End`**: A Node.js and Express application that serves as the API for the e-commerce platform.
- **`Front-End`**: A React application that provides the customer-facing user interface for the e-commerce store.
- **`admin`**: A separate React application that serves as an admin panel for managing products and orders.

## Project Overview

The **Forever MERN E-commerce** project is a modern, feature-rich online store. It provides a seamless shopping experience for customers and a powerful management interface for administrators.

### Key Features

- **Customer-facing store (`Front-End`)**:
  - Browse and search for products.
  - View product details.
  - Add products to the shopping cart.
  - Place orders and make payments.
  - User registration and login.
- **Admin Panel (`admin`)**:
  - Add, edit, and delete products.
  - Manage customer orders.
- **API (`Back-End`)**:
  - Secure RESTful API for all e-commerce operations.
  - JWT-based authentication for both customers and admins.
  - Integration with Stripe and Razorpay for payment processing.

## Architecture

The project follows a classic client-server architecture:

- **`Back-End`**: The backend is built with Node.js and Express. It connects to a MongoDB database to store product, user, and order data. It exposes a set of RESTful API endpoints that the `Front-End` and `admin` applications consume.

- **`Front-End` and `admin`**: Both the `Front-End` and `admin` applications are built with React. They are single-page applications (SPAs) that communicate with the `Back-End` API to fetch and update data.

This separation of concerns allows for independent development and deployment of the frontend and backend components.
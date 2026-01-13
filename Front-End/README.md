# Front-End

This directory contains the React application that serves as the customer-facing user interface for the Forever MERN E-commerce project.

## Technology Stack

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool and development server for modern web projects.
- **React Router DOM**: A library for handling routing in React applications.
- **Axios**: A promise-based HTTP client for making requests to the `Back-End` API.
- **Tailwind CSS**: A utility-first CSS framework for styling the application.
- **React Toastify**: A library for displaying toast notifications.

## Project Structure

The `Front-End` directory is structured as follows:

- **`public/`**: Contains static assets that are publicly accessible.
- **`src/`**: Contains the main source code of the application.
  - **`assets/`**: Contains static assets such as images and icons.
  - **`components/`**: Contains reusable UI components used throughout the application (e.g., `Navbar`, `Footer`, `ProductItem`).
  - **`context/`**: Contains the `ShopContext.jsx` file, which manages the global state of the application using React's Context API.
  - **`pages/`**: Contains the main pages of the application, each corresponding to a specific route (e.g., `Home`, `Product`, `Cart`).
  - **`App.jsx`**: The main component of the application, which defines the routes and the overall layout.
  - **`main.jsx`**: The entry point of the application, where the React app is initialized and rendered.

## Features

- **Product Browsing**: Users can browse and search for products.
- **Product Details**: Users can view detailed information about each product.
- **Shopping Cart**: Users can add products to their shopping cart, update quantities, and view the cart total.
- **User Authentication**: Users can register for a new account and log in.
- **Order Placement**: Logged-in users can place orders and make payments.
- **Order History**: Users can view their past orders.
- **Responsive Design**: The application is designed to be responsive and work on different screen sizes.

## State Management

The application uses React's Context API for global state management. The `ShopContext.jsx` file provides a context that stores and manages the following data:

- **Products**: The list of all products, fetched from the `Back-End`.
- **Shopping Cart**: The items in the user's shopping cart.
- **User Authentication**: The user's authentication token and admin status.

The context also provides functions for interacting with the `Back-End` API to perform actions such as adding items to the cart, updating quantities, and placing orders.

## How to Run

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Set up environment variables**: Create a `.env` file in the `Front-End` directory and add the `VITE_BACKEND_URL` variable, which should point to the URL of the `Back-End` API.
3. **Start the development server**:
   ```bash
   npm run dev
   ```
The application will be available at `http://localhost:5173` (or another port if 5173 is in use).
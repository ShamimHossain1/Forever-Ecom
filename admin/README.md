# Admin Panel

This directory contains the React application that serves as the admin panel for the Forever MERN E-commerce project.

## Technology Stack

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool and development server for modern web projects.
- **React Router DOM**: A library for handling routing in React applications.
- **Axios**: A promise-based HTTP client for making requests to the `Back-End` API.
- **Tailwind CSS**: A utility-first CSS framework for styling the application.
- **React Toastify**: A library for displaying toast notifications.

## Project Structure

The `admin` directory is structured as follows:

- **`public/`**: Contains static assets that are publicly accessible.
- **`src/`**: Contains the main source code of the application.
  - **`assets/`**: Contains static assets such as images and icons.
  - **`components/`**: Contains reusable UI components used throughout the application (e.g., `Navbar`, `Sidebar`, `Login`).
  - **`pages/`**: Contains the main pages of the admin panel, each corresponding to a specific route (e.g., `Add`, `List`, `Orders`).
  - **`App.jsx`**: The main component of the application, which handles authentication and defines the routes and the overall layout.
  - **`main.jsx`**: The entry point of the application, where the React app is initialized and rendered.

## Features

- **Admin Authentication**: The admin panel is protected by a login system. Only authenticated admins can access the management features.
- **Product Management**: Admins can add new products, view a list of all products, and edit existing products.
- **Order Management**: Admins can view and manage customer orders.

## Authentication

The admin panel uses a simple token-based authentication system.

- When the admin logs in, a JWT token is obtained from the `Back-End` API and stored in the browser's `localStorage`.
- This token is then sent with every subsequent request to the API to authenticate the admin.
- If the token is not present or is invalid, the admin is redirected to the login page.

## How to Run

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Set up environment variables**: Create a `.env` file in the `admin` directory and add the `VITE_BACKEND_URL` variable, which should point to the URL of the `Back-End` API.
3. **Start the development server**:
   ```bash
   npm run dev
   ```
The application will be available at `http://localhost:5174` (or another port if 5174 is in use).
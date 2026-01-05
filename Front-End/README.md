# Forever Mern Ecom — Front-End

This folder contains the React/Vite front-end for the Forever Mern Ecom project — a small e-commerce storefront UI implemented with React, Vite and Tailwind CSS. The front-end is focused on product browsing, cart management and a simple checkout UI.

## Tech stack

- React (v19) + Vite
- Tailwind CSS
- React Router DOM for routing
- React Toastify for lightweight notifications

## Quick start

1. Install dependencies

```bash
cd Front-End
npm install
```

2. Start dev server

```bash
npm run dev
```

3. Build for production

```bash
npm run build
```

## Project structure (key files)

- `index.html` — Vite entry HTML.
- `src/main.jsx` — application entry; mounts React tree and provides `BrowserRouter` + `ShopContext` provider.
- `src/App.jsx` — top-level layout: `Navbar`, `SearchBar`, `Routes` and `Footer`.
- `src/context/ShopContext.jsx` — single source of truth for front-end product list and cart state. Exposes:
  - `products`: static product data from `src/assets/frontend_assets/assets`.
  - `cartItems`: object structured as `{ <productId>: { <size>: quantity, ... }, ... }`.
  - `addToCart(itemId, size)`, `getCartCount()`, `getCartAmount()`, `updateQuantity()`.
- `src/components/*` — reusable components (e.g. `Navbar`, `ProductItem`, `RelatedProducts`, `CartTotal`, `Title`, `Footer`).
- `src/pages/*` — route views (e.g. `Home`, `Product`, `Collection`, `Cart`, `Login`, `PlaceOrder`, `Orders`).

## How the front-end works (runtime flow)

1. `main.jsx` wraps the app with `BrowserRouter` and `ShopContextProvider` so all components can access routing and shared app state.
2. `App.jsx` renders `Navbar` and `SearchBar`, then mounts route components defined under `Routes`.
3. `ShopContext` holds a `products` array and `cartItems` object. Components read `products` to render catalog and look up product details by `_id` (for example `Product.jsx` reads `productId` from URL params and finds the matching product in `products`).
4. Cart behavior:
   - `addToCart(productId, size)` ensures `size` is selected and updates `cartItems` (keeps counts grouped by product and size).
   - `Cart.jsx` converts `cartItems` into a flat list for rendering and allows quantity editing via `updateQuantity`.
   - `CartTotal` computes subtotal + delivery fee using functions exposed by `ShopContext`.
5. Checkout / Place Order UI is purely front-end in this repo (no API calls in the current code). Payment options (Stripe, Razorpay, COD) are UI placeholders — integrate with the Back-End endpoints or payment SDKs to make these functional.

## Important implementation notes

- Product data is currently imported from `src/assets/frontend_assets/assets` (static assets). To convert to a dynamic app, replace it with API calls to the Back-End and update `ShopContext` to fetch products.
- `cartItems` is stored in memory only (React state). For persistence across sessions, add localStorage or server-side cart sync.
- Routing: `Product` page expects a route param `/product/:productId` and resolves product details from `products`.

## Recommendations & Next steps

- Hook up product fetching from Back-End (`/api/products` — create endpoint) and replace static `products` import.
- Persist cart per-user (localStorage or via Back-End user cart endpoints).
- Add form validation and API integration for `Login`, `Signup`, and `Place Order`.
- Add unit and integration tests for critical logic in `ShopContext` and cart computation functions.

## Contact / contribution

Open issues or pull requests in the repository; describe the goal and the area of the code you want to change.


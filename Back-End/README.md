# Forever Mern Ecom — Back-End

This folder contains the Back-End API for the Forever Mern Ecom project. It's an Express-based Node.js server that handles user registration, login and basic product persistence. The current code uses MongoDB (via Mongoose) and Cloudinary for media configuration.

## Tech stack

- Node.js (ES modules)
- Express
- MongoDB + Mongoose
- Cloudinary (SDK) for image hosting
- JWT for authentication
- Bcrypt/Bcryptjs for password hashing

## Quick start

1. Install dependencies

```bash
cd Back-End
npm install
```

2. Environment variables (create a `.env` file)

Required variables:

```
MONGODB_URL=<your-mongodb-connection-prefix>
JWT_SECRET=<your-jwt-secret>
CLOUDINARY_CLOUD_NAME=<cloudinary-cloud-name>
CLOUDINARY_API_KEY=<cloudinary-api-key>
CLOUDINARY_API_SECRET_KEY=<cloudinary-api-secret>
PORT=4000
```

Note: `config/mongodb.js` appends `/e-commerce` to `MONGODB_URL` when connecting.

3. Start server (development)

```bash
npm run server
```

4. Start server (production)

```bash
npm start
```

## Folder structure (key files)

- `server.js` — app bootstrap: sets up middleware (`cors`, `express.json()`), connects to MongoDB and Cloudinary, mounts routes and starts the HTTP server.
- `config/mongodb.js` — Mongoose connection helper. Emits `connected` / `error` logs.
- `config/cloudinary.js` — Cloudinary v2 configuration helper.
- `routes/userRoute.js` — routes for user auth: `POST /api/user/register`, `POST /api/user/login`, `POST /api/user/admin`.
- `controllers/userController.js` — controller logic for register & login:
  - `registerUser(req, res)` validates request body, checks whether the user exists, validates email format, enforces minimum password length, hashes the password with `bcrypt`/`bcryptjs`, saves the user and returns a JWT token.
  - `loginUser(req, res)` finds user by email, compares passwords using `bcrypt.compare`, and returns a JWT on success.
  - `createToke(userId)` signs `jwt` payload `{ id: userId }` with `JWT_SECRET` and returns a token. (Token expiry can be tuned in `createToke`.)
- `models/userModel.js` — Mongoose schema for user. Fields: `name`, `email` (unique), `password`, `cartData` (object).
- `models/productModel.js` — product schema used for persisting product data.

## API Endpoints (current)

- `POST /api/user/register` — create a new user

  - Request JSON: `{ name, email, password }`
  - Responses:
    - `400` if data is missing, email invalid, password too short or user already exists.
    - `200` success: `{ success: true, message, user, token }` where `token` is a JWT.

- `POST /api/user/login` — authenticate user
  - Request JSON: `{ email, password }`
  - Responses:
    - `200` success: `{ success: true, message, user, token }`.
    - `200` (or `400`) failure: `{ success: false, message }`.

> Note: The current code does not expose product CRUD endpoints. Add routes/controllers to manage products if you intend to serve dynamic product data to the front-end.

## Implementation details & behavior notes

- Input validation: `validator.isEmail` is used for email format checking; password length is enforced with a minimum of 6 characters. Consider stronger checks or `validator.isStrongPassword` for production.
- Password hashing: `bcrypt.genSalt()` + `bcrypt.hash()` and `bcrypt.compare()` are used. The repo includes both `bcrypt` and `bcryptjs` in dependencies — only one is necessary. Use `bcrypt` for native performance or `bcryptjs` for simpler cross-platform install.
- JWT tokens: `createToke(userId)` creates a token signed with `process.env.JWT_SECRET`. Ensure this secret is set. Tokens are returned to the client on register/login.
- MongoDB connection string: `config/mongodb.js` connects to `${MONGODB_URL}/e-commerce`.
- Middleware: `server.js` enables `cors()` and `express.json()` (required so `req.body` is populated). If you see `Cannot destructure property 'name' of 'req.body' as it is undefined`, verify that `express.json()` middleware is present and your client sends `Content-Type: application/json`.

## Common issues & troubleshooting

- Missing package error for `bcryptjs` vs `bcrypt`: install the package your code imports. Either:

```bash
npm install bcrypt   # or
npm install bcryptjs
```

- `req.body` undefined: ensure `app.use(express.json())` is declared before routes in `server.js` and client sends JSON body with the correct `Content-Type` header.
- JWT errors: set `JWT_SECRET` in environment.
- MongoDB connection issues: confirm `MONGODB_URL` and that the server is reachable.

## Security & production recommendations

- Use `helmet` and tighten CORS policies in production.
- Use stronger password policies (`validator.isStrongPassword`) and check for breached passwords via HaveIBeenPwned APIs.
- Add rate-limiting on auth endpoints to mitigate brute-force attacks.
- Store sensitive config in a secure environment (not in repo). Use rotation and strong secrets.

## Next steps (suggested)

- Add product CRUD endpoints and secure them (admin role). Use `productModel` for persistence.
- Add refresh token flow, token blacklisting (logout) and role-based access control (admin vs user).
- Add unit tests for controllers and integration tests for routes.

If you want, I can:

- add product endpoints and example routes,
- implement server-side cart persistence for logged-in users,
- or wire the Front-End to Back-End product endpoints and auth flows.

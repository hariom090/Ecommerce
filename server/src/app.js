import express from 'express';
import cors from 'cors';
import userRoutes from './Routes/user.routes.js';
import productRoutes from './Routes/product.routes.js';
import cartRoutes from './Routes/cart.routes.js';
import wishlistRoutes from './Routes/wishlist.routes.js';

const app = express();
console.log("CORS origin:", process.env.CORS_NAME);


app.use(cors({
    origin: process.env.CORS_NAME,
    credentials: true
}));


app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use((req, res, next) => {
  console.log("404 Route not found:", req.method, req.originalUrl);
  res.status(404).json({ message: "Route not found" });});

export {app};
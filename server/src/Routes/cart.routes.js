import express from "express";
import Cart from "../Models/cart.model.js";
import Product from "../Models/product.model.js";
import mongoose from "mongoose";

const router = express.Router();

// Get user cart




router.post("/add", async (req, res) => {
    try {
        let { userId, productId, quantity } = req.body;
        
        // Ensure they are ObjectIds
        userId = new mongoose.Types.ObjectId(userId);
    productId = new mongoose.Types.ObjectId(productId);

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    const existingProduct = cart.products.find(
      (p) => p.productId.toString() === productId.toString()
    );
    
    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error("❌ Cart Error:", err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId })
      .populate("products.productId"); // populate product details
    res.json(cart || { products: [] });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Remove product from cart
router.post("/remove", async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { products: { productId } } },
      { new: true }
    ).populate("products.productId");

    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/update", async (req, res) => {
  try {
    const { userId, productId, change } = req.body;
    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const item = cart.products.find(p => p.productId.toString() === productId);
    if (item) {
      item.quantity = Math.max(1, item.quantity + change);
    }

    await cart.save();
    await cart.populate("products.productId"); // ✅ populate again

    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});



export default router;

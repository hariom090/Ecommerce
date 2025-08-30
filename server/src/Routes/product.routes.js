import express from "express";
import Product from "../Models/product.model.js";

const router = express.Router();

// ✅ Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Rate or update rating
// product.routes.js
router.post("/:id/rating", async (req, res) => {
  try {
    const { userId, value } = req.body;

    if(!value || value<1 || value > 5){
        return res.status(400).json({message: " Invalid rating is given."});
    }

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Check if user already rated
    const existingRating = product.ratings.find(r => r.userId.toString() === userId);

    if (existingRating) {
      existingRating.value = value; // update rating
    } else {
      product.ratings.push({ userId, value });
    }

    await product.save();

    // ✅ Calculate average
    const avgRating =
      product.ratings.reduce((acc, r) => acc + r.value, 0) / product.ratings.length;

    res.json({ message: "Rating updated", avgRating });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});



export default router;

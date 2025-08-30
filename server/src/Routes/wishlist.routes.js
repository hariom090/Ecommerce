import express from "express";
import Wishlist from "../Models/wishlist.model.js";

const router = express.Router();

// ✅ Add/Remove product from wishlist
router.post("/toggle", async (req, res) => {
  try {
    const { userId, productId } = req.body;

    let wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      wishlist = new Wishlist({ userId, products: [productId] });
      await wishlist.save();
      return res.json({ message: "Added to wishlist", wishlist });
    }

    if (wishlist.products.includes(productId)) {
      // remove
      wishlist.products = wishlist.products.filter(
        (p) => p.toString() !== productId
      );
      await wishlist.save();
      return res.json({ message: "Removed from wishlist", wishlist });
    } else {
      // add
      wishlist.products.push(productId);
      await wishlist.save();
      return res.json({ message: "Added to wishlist", wishlist });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get wishlist
router.get("/:userId", async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.params.userId })
      .populate("products");
    res.json(wishlist || { products: [] });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

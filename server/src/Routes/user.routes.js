import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../Models/user.model.js";
import { generateAccessToken, generateRefreshToken } from "../Controllers/user.controllers.js";
import { verifyToken } from "../Middlewares/auth.middleware.js";

const router = express.Router();

/**
 * ✅ Add Address
 */
router.post("/:id/address", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.addresses.push(req.body);
    await user.save();

    res.json({ message: "Address added", addresses: user.addresses });
  } catch (err) {
    console.error("Error adding address:", err);
    res.status(500).json({ message: "Error adding address", error: err.message });
  }
});




// ✅ Update specific address (no userId in URL)
router.put("/address/:addressId", verifyToken, async (req, res) => {
  try {
    const { addressId } = req.params;
    const { street, city, state, country, postalCode } = req.body;

    // Validate addressId
    if (!mongoose.Types.ObjectId.isValid(addressId)) {
      return res.status(400).json({ message: "Invalid addressId" });
    }

    // User comes from token (verifyToken middleware)
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the address subdocument
    const address = user.address.id(addressId);
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    // Update fields
    if (street) address.street = street;
    if (city) address.city = city;
    if (state) address.state = state;
    if (country) address.country = country;
    if (postalCode) address.postalCode = postalCode;

    await user.save();

    return res.status(200).json({ message: "Address updated", address });
  } catch (err) {
    console.error("Update address error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});



/**
 * ✅ Update Profile
 */
router.put("/update-profile", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id; // from JWT
    const { fullName, phone } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { fullName, phone },
      { new: true }
    ).select("-password");

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error: error.message });
  }
});

/**
 * ✅ Refresh Access Token
 */
router.post("/refresh", async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) return res.status(401).json({ message: "Refresh token required" });

  const user = await User.findOne({ refreshToken });
  if (!user) return res.status(403).json({ message: "Invalid refresh token" });

  jwt.verify(refreshToken, process.env.REFRESH_TOKENS_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid refresh token" });

    const newAccessToken = generateAccessToken(decoded.id);
    res.json({ accessToken: newAccessToken });
  });
});

/**
 * ✅ Get User Orders (placeholder)
 */
router.get("/orders", (req, res) => {
  res.json([]); // empty for now
});

/**
 * ✅ Get Current User (/me)
 */
router.get("/me", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKENS_SECRET);

    const user = await User.findById(decoded.id).select("-password -refreshToken");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    console.error("Fetch user error:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Access token expired" });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid access token" });
    }

    res.status(500).json({ message: "Server error" });
  }
});

/**
 * ✅ Login
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    res.json({
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone || "",
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * ✅ Create Account
 */
router.post("/create-account", async (req, res) => {
  try {
    const { fullName, email, phone, password, confirmPassword } = req.body;

    if (!fullName || !email || !phone || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const newUser = new User({ fullName, email, phone, password });
    await newUser.save();

    res.status(201).json({ message: "Account created successfully" });
  } catch (error) {
    console.error("Error creating account:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;


import jwt from "jsonwebtoken";
import User from "../Models/user.model.js";

export const verifyToken = async (req, res, next) => {
    try {
        // Get token from Authorization header
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1]; // Format: Bearer <token>

        if (!token) {
            return res.status(401).json({ message: "Access token missing" });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKENS_SECRET);

        // Attach user to request
        req.user = await User.findById(decoded.id).select("-password");
        if (!req.user) {
            return res.status(404).json({ message: "User not found" });
        }

        next();
    } catch (err) {
        console.error("Auth error:", err);
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};

import jwt from "jsonwebtoken";

export const generateAccessToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.ACCESS_TOKENS_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
};

export const generateRefreshToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.REFRESH_TOKENS_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
};

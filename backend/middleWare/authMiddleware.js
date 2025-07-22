

import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ success: false, message: "No token provided" });
        }

        console.log("Extracted Token:", token); // Debugging line

        // Verify Token
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        console.log("Decoded Token:", decoded); // Debugging line

        if (!decoded.id) {
            return res.status(401).json({ success: false, message: "Invalid token" });
        }

        // Fetch User from DB
        const user = await User.findById(decoded.id).select("-password"); // Exclude password
        console.log("Fetched User:", user); // Debugging line

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        req.user = user; // Attach user to request
        next(); // Continue to next middleware/route
    } catch (error) {
        console.error("Auth Error:", error);
        res.status(401).json({ success: false, message: "Authentication failed" });
    }
};

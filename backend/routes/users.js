const { Router } = require("express");
const jwt = require("jsonwebtoken");
const router = Router();
const User = require("../models/user");
const cookieParser = require("cookie-parser");

router.post("/signin", async (req, res) => {

    try {
    const { email, password } = req.body;
        const user = await User.findOne({ email, password });

        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const payload = {
            id: user._id,
            username: user.username,
            email: user.email,
        };

        const token = jwt.sign(payload, "asdfghjkl", { expiresIn: "7d" });

        res.cookie("token", token, { path: "/", maxAge: 7 * 24 * 60 * 60 * 1000 });

        return res.status(200).json({ message: "Login successful", token, user: payload });

    } catch (error) {
        return res.status(500).json({ error: "Server error" });
    }
});

router.post("/signup", async (req, res) => {

    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ error: "User already exists" });
        }

        const newUser = await User.create({ username, email, password });

        return res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        return res.status(500).json({ error: "Failed to create user" });
    }
});

module.exports = router;

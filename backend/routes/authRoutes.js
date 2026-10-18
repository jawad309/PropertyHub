
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ========================================
// REGISTER
// POST /api/auth/register
// ========================================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body || {};

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: "Name, email and password are required.",
      });
    }

    if (name.trim().length < 2 || name.trim().length > 50) {
      return res.status(400).json({
        message: "Name must be between 2 and 50 characters.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already registered. Please login.",
      });
    }

    // Hash the password before saving it.
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Account created successfully. Please login.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Register route error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        message: "Email already registered. Please login.",
      });
    }

    return res.status(500).json({
      message: "Registration failed due to a server error.",
    });
  }
});

// ========================================
// LOGIN
// POST /api/auth/login
// ========================================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: "Email and password are required.",
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing on the server.");

      return res.status(500).json({
        message: "Server authentication configuration error.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    if (typeof user.password !== "string") {
      console.error("User password hash is missing or invalid.");

      return res.status(500).json({
        message: "Unable to verify account credentials.",
      });
    }

    // Verify the entered password against the saved hash.
    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const token = jwt.sign(
      { userId: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login route error:", error);

    return res.status(500).json({
      message: "Login failed due to a server error.",
    });
  }
});

// ========================================
// FORGOT PASSWORD
// POST /api/auth/forgot-password
// Email reset is not configured yet.
// ========================================
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body || {};

    if (typeof email !== "string" || !email.trim()) {
      return res.status(400).json({
        message: "Please enter your email address.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    // Avoid revealing whether an account exists.
    if (!user) {
      return res.status(200).json({
        message:
          "If an account exists for this email, password reset instructions can be requested.",
      });
    }

    // A secure token and email delivery must be configured
    // before an actual password reset can be performed.
    return res.status(501).json({
      message:
        "Password reset is not configured yet. Please contact support.",
    });
  } catch (error) {
    console.error("Forgot password route error:", error);

    return res.status(500).json({
      message: "Unable to process your request right now.",
    });
  }
});

module.exports = router;

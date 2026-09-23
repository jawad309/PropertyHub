const express = require("express");
const Property = require("../models/Property");
const authMiddleware = require("../authMiddleware");

const router = express.Router();

// GET ALL PROPERTIES
// Public: sab users properties dekh sakte hain
router.get("/", async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });

    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch properties",
      error: error.message,
    });
  }
});

// GET MY PROPERTIES
// Protected: sirf logged-in user ki properties
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const properties = await Property.find({
      owner: req.user.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch your properties",
      error: error.message,
    });
  }
});

// GET SINGLE PROPERTY
// Public: property details sab dekh sakte hain
router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    res.status(200).json(property);
  } catch (error) {
    res.status(400).json({
      message: "Invalid property ID",
      error: error.message,
    });
  }
});

// CREATE PROPERTY
// Protected: owner automatically logged-in user hoga
router.post("/", authMiddleware, async (req, res) => {
  try {
    const property = new Property({
      ...req.body,
      owner: req.user.userId,
    });

    const savedProperty = await property.save();

    res.status(201).json(savedProperty);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create property",
      error: error.message,
    });
  }
});

// UPDATE PROPERTY
// Protected: user sirf apni property update kar sakta hai
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedProperty = await Property.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user.userId,
      },
      {
        ...req.body,
        owner: req.user.userId,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProperty) {
      return res.status(404).json({
        message: "Property not found or you are not the owner.",
      });
    }

    res.status(200).json(updatedProperty);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update property",
      error: error.message,
    });
  }
});

// DELETE PROPERTY
// Protected: user sirf apni property delete kar sakta hai
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedProperty = await Property.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.userId,
    });

    if (!deletedProperty) {
      return res.status(404).json({
        message: "Property not found or you are not the owner.",
      });
    }

    res.status(200).json({
      message: "Property deleted successfully",
      property: deletedProperty,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to delete property",
      error: error.message,
    });
  }
});

module.exports = router;
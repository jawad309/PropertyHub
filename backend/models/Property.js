const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Property title is required"],
      minlength: 3,
      maxlength: 100,
    },

    type: {
      type: String,
      required: [true, "Property type is required"],
      enum: ["House", "Apartment", "Plot"],
    },

    location: {
      type: String,
      required: [true, "Location is required"],
      minlength: 2,
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 1,
    },

    bedrooms: {
      type: Number,
      min: 0,
      default: 0,
    },

    bathrooms: {
      type: Number,
      min: 0,
      default: 0,
    },

    area: {
      type: String,
      required: [true, "Area is required"],
    },

    image: {
      type: String,
      default: "https://via.placeholder.com/600x400",
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: 10,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Property", propertySchema);
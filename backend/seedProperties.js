const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Property = require("./models/Property");

dotenv.config();

const properties = [
  {
    title: "Modern Family House",
    type: "House",
    location: "Jinnahabad, Abbottabad",
    price: 18500000,
    bedrooms: 5,
    bathrooms: 4,
    area: "10 Marla",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    description:
      "A beautiful modern family house located in a peaceful area of Abbottabad.",
  },

  {
    title: "Luxury Apartment",
    type: "Apartment",
    location: "F-11, Islamabad",
    price: 12500000,
    bedrooms: 3,
    bathrooms: 3,
    area: "1800 sq ft",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
    description:
      "A spacious luxury apartment with modern facilities in Islamabad.",
  },

  {
    title: "Beautiful Villa",
    type: "House",
    location: "Nathia Gali",
    price: 32000000,
    bedrooms: 6,
    bathrooms: 5,
    area: "2 Kanal",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
    description:
      "A beautiful villa surrounded by nature and mountains in Nathia Gali.",
  },

  {
    title: "Affordable Family House",
    type: "House",
    location: "Mansehra",
    price: 9500000,
    bedrooms: 4,
    bathrooms: 3,
    area: "7 Marla",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
    description:
      "An affordable family house with comfortable rooms and a peaceful location.",
  },

  {
    title: "Executive Apartment",
    type: "Apartment",
    location: "Bahria Town, Islamabad",
    price: 15500000,
    bedrooms: 3,
    bathrooms: 2,
    area: "1600 sq ft",
    image: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154",
    description:
      "A stylish apartment suitable for families looking for a modern lifestyle.",
  },

  {
    title: "Residential Plot",
    type: "Plot",
    location: "New City, Abbottabad",
    price: 6500000,
    bedrooms: 0,
    bathrooms: 0,
    area: "10 Marla",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
    description:
      "A residential plot in a developing and peaceful area of Abbottabad.",
  },

  {
    title: "Spacious City House",
    type: "House",
    location: "Hayatabad, Peshawar",
    price: 22000000,
    bedrooms: 5,
    bathrooms: 4,
    area: "10 Marla",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
    description:
      "A spacious house with modern design and excellent family living space.",
  },

  {
    title: "Modern Downtown Apartment",
    type: "Apartment",
    location: "G-11, Islamabad",
    price: 9800000,
    bedrooms: 2,
    bathrooms: 2,
    area: "1200 sq ft",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
    description:
      "A modern apartment located close to schools, markets and major roads.",
  },

  {
    title: "Mountain View House",
    type: "House",
    location: "Supply, Abbottabad",
    price: 14000000,
    bedrooms: 4,
    bathrooms: 3,
    area: "8 Marla",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    description:
      "A comfortable house offering beautiful mountain views and a peaceful environment.",
  },

  {
    title: "Prime Location Plot",
    type: "Plot",
    location: "Islamabad",
    price: 11000000,
    bedrooms: 0,
    bathrooms: 0,
    area: "8 Marla",
    image: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e",
    description:
      "A prime residential plot suitable for building a modern family home.",
  },
];

const seedProperties = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully.");

    // Purani properties remove karega
    await Property.deleteMany({});

    // New properties insert karega
    await Property.insertMany(properties);

    console.log("10 properties added successfully!");

    await mongoose.connection.close();

    console.log("Database connection closed.");
  } catch (error) {
    console.error("Error:", error.message);

    process.exit(1);
  }
};

seedProperties();
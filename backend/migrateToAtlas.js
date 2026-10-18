const mongoose = require("mongoose");
require("dotenv").config();

const LOCAL_URI = "mongodb://localhost:27017/propertyhub";
const ATLAS_URI = process.env.MONGO_URI;

async function migrate() {
  try {
    // Local database
    const local = await mongoose.createConnection(LOCAL_URI).asPromise();
    console.log("Local MongoDB connected ✅");

    const localProperties = await local
      .useDb("propertyhub")
      .collection("properties")
      .find({})
      .toArray();

    console.log(`Found ${localProperties.length} local properties`);

    // Atlas database
    const atlas = await mongoose.createConnection(ATLAS_URI).asPromise();
    console.log("Atlas connected ✅");

    const atlasProperties = atlas
      .useDb("propertyhub")
      .collection("properties");

    // Clear old Atlas properties
    await atlasProperties.deleteMany({});

    if (localProperties.length > 0) {
      await atlasProperties.insertMany(localProperties);
    }

    console.log(
      `${localProperties.length} properties transferred to Atlas successfully 🎉`
    );

    await local.close();
    await atlas.close();
  } catch (error) {
    console.error("Migration failed ❌");
    console.error(error.message);
  }
}

migrate();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI || process.env.MONGO_URI == "") {
      console.log("mongo Uri Not present at .env");
      return;
    }
    const connectionString = await mongoose.connect(process.env.MONGO_URI);
    console.log("mongodb connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

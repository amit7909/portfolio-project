// src/config/db.js
const mongoose = require('mongoose');

// SENIOR LEAD TIP:
// We use an async function to connect. This allows us to use await
// and cleaner try/catch blocks for error handling.
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // Exit process with failure. Critical because if DB is down,
    // the API is useless.
    process.exit(1);
  }
};

module.exports = connectDB;
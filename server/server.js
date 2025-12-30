// server.js
require('dotenv').config(); // Load env vars immediately
const app = require('./src/app');
const connectDB = require('./src/config/db');

const PORT = process.env.PORT || 5000;

// 1. Connect to Database
connectDB();

// 2. Start Server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
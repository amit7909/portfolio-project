// createAdmin.js
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/user');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to DB'))
  .catch(err => console.log(err));

const createAdmin = async () => {
  try {
    // 1. Delete any old users (Optional: Remove this line if you want multiple admins)
    await User.deleteMany(); 

    // 2. Create your account
    // CHANGE THESE TO YOUR REAL DETAILS
    const user = await User.create({
      email: "amittiwari79099@gmail.com", 
      password: "7909948501*aT" 
    });

    console.log('🎉 Admin Account Created!');
    console.log(`Email: ${user.email}`);
    console.log('Password: (Encrypted)');
    
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

createAdmin();
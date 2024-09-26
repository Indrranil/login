// models/User.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  otp: String, // Optional: to store OTP
});

// Create and export the User model
const User = mongoose.model("User", userSchema);
module.exports = User;

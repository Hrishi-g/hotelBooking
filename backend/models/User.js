const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  country: { // This field is fine
    type: String,
    // required: true, // Uncomment if you want this to be required
  },
  mobile: { // Ensure this is a number
    type: Number,
    unique: true
    // required: true, // Uncomment if you want this to be required
  },
  password: {
    type: String,
    required: true,
  },
  inviteCode: {
    type: String,
    required: true,
  }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;


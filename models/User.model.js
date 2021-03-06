const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to
//whatever makes sense in this case
const userSchema = new Schema({
  username: { type: String, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
  },
  password: String,
  userPhotoUrl: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const User = model("User", userSchema);

module.exports = User;

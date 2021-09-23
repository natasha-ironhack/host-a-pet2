const { Schema, model, isValidObjectId } = require("mongoose");
const fileUploader = require("../middlewares/cloudinary.config");

// TODO: Please make sure you edit the user model to
//whatever makes sense in this case
const userSchema = new Schema({
  // unique: true -> Ideally, should be unique,
  //but its up to you
  name: String,
  breed: {
    type: String,
    enum: ["Guinea Pig", "Hamster", "Rat", "Gerbil", "Mouse"]
  },
  age: Number,
  photoUrl: String,
  description: String,
  //change status to available, and assign a boolean value
  available: {
    type: Boolean,
    default: true,
  },
  hostedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  }, //create relation to user model,
});

const User = model("Pet", userSchema);

module.exports = User;

const { Schema, model, isValidObjectId } = require("mongoose");
const fileUploader = require("../config/cloudinary.config")

// TODO: Please make sure you edit the user model to
//whatever makes sense in this case
const userSchema = new Schema({
  // unique: true -> Ideally, should be unique,
  //but its up to you
  name: String,
  breed: String,
  age: Number,
  photoUrl: String,
  description: String,
  status: String,
  hostedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  }, //create relation to user model,
});

const User = model("Pet", userSchema);

module.exports = User;

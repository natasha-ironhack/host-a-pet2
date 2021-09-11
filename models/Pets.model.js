const { Schema, model, isValidObjectId } = require("mongoose");

// TODO: Please make sure you edit the user model to
//whatever makes sense in this case
const userSchema = new Schema({
  pet: {
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
  },
});

const User = model("Pet ", userSchema);

module.exports = User;

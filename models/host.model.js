const { Schema, model } = require("mongoose")

const hostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  pet: {
      type: Schema.Types.ObjectId,
      ref: "Pet",
  },
  status: String,
  duration: Date,
});

const Host = model("Host", hostSchema);

module.exports = Host;
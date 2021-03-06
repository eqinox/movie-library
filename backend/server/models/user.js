const mongoose = require("mongoose");
const encryption = require("../utilities/encryption");
// const uniqueValiddator = require("mongoose-unique-validator");

const ERROR_VALIDATION_MESSAGE = "${PATH} is required";

let userSchema = new mongoose.Schema({
  password: { type: String, required: ERROR_VALIDATION_MESSAGE },
  email: { type: String, required: ERROR_VALIDATION_MESSAGE, unique: true },
  roles: [{ type: String }],
  salt: { type: String, required: ERROR_VALIDATION_MESSAGE },
  movies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
  favourite: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
  voteFor: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});

userSchema.method({
  authenticate: function (password) {
    let hashedPassword = encryption.generateHashedPassword(this.salt, password);

    if (hashedPassword === this.password) {
      return true;
    }
    return false;
  },
});


// userSchema.plugin(uniqueValiddator);

const User = mongoose.model("User", userSchema);

module.exports = User;

const mongoose = require("mongoose");

const ERROR_VALIDATION_MESSAGE = "${PATH} is required";

let movieSchema = new mongoose.Schema({
  image: { type: String },
  title: { type: String, required: ERROR_VALIDATION_MESSAGE },
  body: { type: String },
  genre: { type: String },
  duration: { type: String },
  publishedDate: { type: Date },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: ERROR_VALIDATION_MESSAGE,
  },
  usersFavourite: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }]
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;

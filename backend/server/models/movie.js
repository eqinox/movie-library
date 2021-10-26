const mongoose = require("mongoose");

const ERROR_VALIDATION_MESSAGE = "${PATH} is required";

let movieSchema = new mongoose.Schema({
  image: { type: String },
  title: { type: String, required: ERROR_VALIDATION_MESSAGE },
  body: { type: String },
  genres: [{ type: String }],
  duration: { type: Number },
  publishedDate: { type: Date },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: ERROR_VALIDATION_MESSAGE,
  },
  usersFavourite: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
  votes: [Number],
  totalVote: Number,
  alreadyVoted: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;

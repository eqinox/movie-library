const mongoose = require("mongoose");

let noteSchema = new mongoose.Schema({
  text: {type: String},
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;

const HttpError = require("../models/http-error");
const Movie = require("mongoose").model("Movie");
const User = require("mongoose").model("User");
const Note = require("mongoose").model("Note");

module.exports.getAll = async (req, res) => {
  const all = await Movie.find();
  res.status(200).json(all);
};

module.exports.edit = async (req, res, next) => {};

module.exports.delete = async (req, res, next) => {};

module.exports.add = async (req, res, next) => {
  const id = req.userData.id;

  let user;
  try {
    user = await User.findById(id);

    if (!user) {
      return next(new HttpError("Could not find user", 404));
    }

    const newMovie = {
      title: req.body.title,
      body: req.body.body,
      publishedDate: new Date(),
      owner: user._id,
      genre: req.body.genre,
      duration: req.body.duration,
      image: req.file ? req.file.path : null,
    };
    let createdMovie = new Movie(newMovie);

    await createdMovie.save();

    // push the movie to current user movies
    user.movies.push(createdMovie);
    await user.save();
    res.status(200).json({ message: "Successfuly created article" });
  } catch (err) {
    return next(new HttpError(err.toString(), 500));
  }
};

module.exports.getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const movie = await Movie.findById(id);
    res.status(200).json(movie);
  } catch (error) {
    return next("Movie not found!", 404);
  }
};

module.exports.addNote = async (req, res, next) => {
  const userId = req.userData.id;
  const movieId = req.body.id;
  const text = req.body.text;

  try {
    const note = await Note.findOne({ owner: userId, movie: movieId });
    const user = await User.findById(userId);
    const movie = await Movie.findById(movieId);
    if (!user || !movie) {
      return next("Adding note failed", 500);
    }
    if (note) {
      note.text = text;
      const savedNote = await note.save();
      res.status(200).json(savedNote);
    } else {
      let createdNote = new Note({ text });
      user.notes.push(createdNote);
      movie.notes.push(createdNote);
      createdNote.owner = user._id;
      createdNote.movie = movie._id;
      const noteResponse = await createdNote.save();
      await user.save();
      await movie.save();
      res.status(200).json(noteResponse);
    }
  } catch (error) {
    return next(new HttpError("Creating note failed!", 500));
  }
};

module.exports.vote = async (req, res, next) => {
  const number = req.body.number;
  const movieId = req.body.id;
  const userId = req.userData.id;

  try {
    const movie = await Movie.findById(movieId);
    const user = await User.findById(userId);
    let totalSum = 0;

    if (!movie.alreadyVoted) {
      movie.alreadyVoted = user;
      movie.votes.push(number);
      user.voteFor.push(movie);
    }
    for (const num of movie.votes) {
      totalSum += num;
    }

    const result = Math.round(totalSum / movie.votes.length);

    await movie.save();
    await user.save();

    res.status(200).json({ totalVote: result });
  } catch (error) {
    return next(new HttpError("Vote failed", 500));
  }
};

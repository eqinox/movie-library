const HttpError = require("../models/http-error");
const Movie = require("mongoose").model("Movie");
const User = require("mongoose").model("User");
const Note = require("mongoose").model("Note");

module.exports.getAll = async (req, res) => {
  const all = await Movie.find();
  res.status(200).json(all);
};

module.exports.edit = async (req, res, next) => {
  console.log(req.params);
  const { title, body, duration, genres } = req.body;
  const movieId = req.params.id;
  const userId = req.userData.id;

  let owner;
  let movie;
  try {
    owner = await User.findById(userId);
    movie = await Movie.findById(movieId);
  } catch (error) {
    return next(
      new HttpError("Something went wrong, could not update the movie", 500)
    );
  }

  if (owner._id.toString() !== movie.owner._id.toString()) {
    return next(new HttpError("owner id and movie owner id are not same", 500));
  }
  movie.title = title;
  movie.body = body;
  movie.duration = duration;
  movie.genres = genres;

  try {
    await movie.save();
    res.status(200).json({ message: "updated successfuly", movie });
  } catch (error) {
    return next(new HttpError("Could not save the movie", 500));
  }
};

module.exports.delete = async (req, res, next) => {
  // TODO: Remove the connection from user's favourite array
  const movieId = req.params.id;
  const userId = req.userData.id;

  try {
    const owner = await User.findById(userId);
    const movie = await Movie.findById(movieId);

    if (movie.owner._id.toString() !== owner.id.toString()) {
      return next(
        new HttpError(
          "Deleting movie failed movie owner is not the same as current",
          500
        )
      );
    }

    // TODO: HOW TO do it better ?
    const users = await User.find();
    for (const user of users) {
      user.favourite.pull({ _id: movieId });
      user.movies.pull({ _id: movieId });
      await user.save();
    }
    await Movie.findByIdAndDelete(movieId);
    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    new HttpError("Deleting Movie failed", 500);
  }
};

module.exports.add = async (req, res, next) => {
  const id = req.userData.id;

  let user;
  try {
    user = await User.findById(id);

    if (!user) {
      return next(new HttpError("Could not find user", 404));
    }
    const genresArray = req.body.genres.split(",");
    const newMovie = {
      title: req.body.title,
      body: req.body.body,
      publishedDate: new Date(),
      owner: user._id,
      genres: genresArray,
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

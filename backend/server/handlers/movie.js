const HttpError = require("../models/http-error");
const Movie = require("mongoose").model("Movie");
const User = require("mongoose").model("User");

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

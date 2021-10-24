const handlers = require("../handlers");

const { check } = require("express-validator");
const isAuth = require("../middlewares/is-auth");
const HttpError = require("../models/http-error");

const fileUpload = require("../middlewares/file-upload");

module.exports = (app) => {
  // Users
  app.post(
    "/users/login",
    [
      check("email").normalizeEmail().isEmail(),
      check("password").isLength({ min: 3, max: 20 }),
    ],
    handlers.user.login
  );
  app.post(
    "/users/register",
    [
      check("email").normalizeEmail().isEmail(),
      check("password").isLength({ min: 3, max: 20 }),
    ],
    handlers.user.register
  );
  app.post("/user/add-favourite", isAuth, handlers.user.addToFavourite);
  app.post("/user/remove-favourite", isAuth, handlers.user.removeFromFavourite);

  // Movies
  app.post(
    "/movie/add",
    fileUpload.single("image"),
    isAuth,
    handlers.movie.add
  );

  app.post("/movie/vote", isAuth, handlers.movie.vote);

  app.get("/movies", handlers.movie.getAll);
  app.get("/movie/:id", handlers.movie.getById);

  // Notes
  app.post("/movie/add-note", isAuth, handlers.movie.addNote);

  // nothing match and throw error
  app.use((req, res, next) => {
    throw new HttpError("Could not find this route.", 404);
  });
};

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

  // Movies
  app.post(
    "/movie/add",
    fileUpload.single("image"),
    isAuth,
    handlers.movie.add
  );

  app.get("/movies", handlers.movie.getAll);

  // nothing match and throw error
  app.use((req, res, next) => {
    throw new HttpError("Could not find this route.", 404);
  });
};

const handlers = require("../handlers");

const { check } = require("express-validator");
const HttpError = require("../models/http-error");

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

  // nothing match and throw error
  app.use((req, res, next) => {
    throw new HttpError("Could not find this route.", 404);
  });
};

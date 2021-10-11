let User = require("mongoose").model("User");
let encryption = require("../utilities/encryption");
const jwt = require("jsonwebtoken");
const logger = require("../utilities/logger");
const environment = process.env.NODE_ENV || "development";
const settings = require("../config/settings")[environment];
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");

module.exports.register = async (req, res, next) => {
  const errors = validationResult(req); // come from express-validator
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  let existingUser;
  try {
    existingUser = await User.findOne({ email: req.body.email });
  } catch (err) {
    return next(new HttpError(err.toString(), 500));
  }

  if (existingUser) {
    return next(
      new HttpError("User exist already, please login instead.", 422)
    );
  }

  const incomingUser = {
    password: req.body.password,
    email: req.body.email,
    roles: ["User"],
  };

  const salt = encryption.generateSalt();
  const password = encryption.generateHashedPassword(
    salt,
    incomingUser.password
  );

  incomingUser.password = password;
  incomingUser.salt = salt;

  const createdUser = new User(incomingUser);

  try {
    const user = await createdUser.save();
    const payload = { id: user._id };
    const token = jwt.sign(payload, settings.secret, {
      expiresIn: settings.expireToken,
    });
    const message = {
      message: `Successfuly Registered ${user.email}`,
      email: user.email,
      id: user._id,
      token,
    };
    logger.tempLog.info("User Register: ", message);
    res.status(201).json({ user: message });
  } catch (err) {
    console.log(err);
    logger.errorLog.error("Register User Error:", {
      error: err,
      body: hidePassword(req.body),
      headers: req.headers,
    });
    return next(new HttpError("Creating user failed", 400));
  }
};

// hide the password because dont want people to see the real pass (for logging)
function hidePassword(request) {
  if (request.password && request.password2) {
    (request.password = "***"), (request.password2 = "***");
    return request;
  } else {
    return request;
  }
}

module.exports.login = async (req, res, next) => {
  let user;
  try {
    user = await User.findOne({ email: req.body.email });
  } catch (err) {
    return next(
      new HttpError("Signing up failed, please try again later.", 500)
    );
  }

  if (!user) {
    return next(new HttpError("User not found!", 404));
  }

  if (!user.authenticate(req.body.password)) {
    return next(new HttpError("Invalid user credentials!", 404));
  }

  const payload = { id: user._id };
  const token = jwt.sign(payload, settings.secret, {
    expiresIn: settings.expireToken,
  });
  const message = {
    message: `Successfuly logged in ${user.email}`,
    email: user.email,
    id: user._id,
    token,
  };
  logger.tempLog.info("User Login: ", message);
  res.status(200).json({ user: message });
};

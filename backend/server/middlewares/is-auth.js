const jwt = require("jsonwebtoken");
const environment = process.env.NODE_ENV || "development";
const settings = require("../config/settings")[environment];
const HttpError = require("../models/http-error");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      return next(new HttpError("Unauthorized!", 401));
    }
    const decodedToken = jwt.verify(token, settings.secret);
    req.userData = { id: decodedToken.id };
    next();
  } catch (error) {
    return next(new HttpError("Authentication Failed", 401));
  }
};

const path = require("path");
const routes = require("./routes");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const coockieParser = require("cookie-parser");
const defaultError = require("../middlewares/default-error");

module.exports = (app) => {
  app.use(cors());
  app.use(coockieParser());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use("/uploads/images", express.static(path.join("uploads", "images")));
  routes(app);
  app.use(defaultError);
};

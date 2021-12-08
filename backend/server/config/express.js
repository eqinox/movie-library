const path = require("path");
const fs = require("fs");
const routes = require("./routes");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const coockieParser = require("cookie-parser");
const defaultError = require("../middlewares/default-error");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

module.exports = (app) => {
  app.use(cors());
  app.use(coockieParser());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  const accessLogStream = fs.createWriteStream(
    path.join(__dirname, "/../../logs/access.log"),
    { flags: "a" }
  );

  app.use(helmet());
  app.use(compression());
  app.use(morgan("combined", { stream: accessLogStream }));

  app.use("/uploads/images", express.static(path.join("uploads", "images")));

  routes(app);
  app.use(defaultError);
};

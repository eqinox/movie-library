const path = require("path");
const EXPIRE_COOKIE = "20m";

module.exports = {
  development: {
    port: 1339,
    connectionString: "mongodb://localhost:27017/movie_library",
    rootPath: path.normalize(path.join(__dirname, "/../../")),
    secret: "udri bai filipe",
    expireToken: EXPIRE_COOKIE,
  },
  production: {
    // TODO: in the future
  },
};

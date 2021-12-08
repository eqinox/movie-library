const path = require("path");
const EXPIRE_COOKIE = "20m";

module.exports = {
  development: {
    port: 1339,
    // connectionString:
    //   `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0movie.n1als.mongodb.net/${process.env.MONGO_DATABASE}`,
    connectionString: "mongodb://localhost:27017/movie_library",
    rootPath: path.normalize(path.join(__dirname, "/../../")),
    secret: 'udri bai filipe',
    expireToken: EXPIRE_COOKIE,
  },
  production: {
    port: process.env.port,
    secret: process.env.SECRET_KEY,
    connectionString: "mongodb+srv://eqinox:36993699@cluster0movie.n1als.mongodb.net/test",
    // TODO: in the future
  },
};

import React from "react";
import { Link } from "react-router-dom";

import classes from "./FavouriteMovieCard.module.css";
const defaultImage =
  "https://cdn.britannica.com/q:60/91/181391-050-1DA18304/cat-toes-paw-number-paws-tiger-tabby.jpg";

const FavouriteMovieCard = (props) => {
  // from props
  const movie = props.movie;
  const movieId = movie._id;
  const image = movie.image
    ? `http://localhost:1339/${movie.image}`
    : defaultImage;
  const title = movie.title;

  return (
    <div className={classes.card}>
      <Link to={`/movie/view/${movieId}`}>
        <div>
          <img alt="something" src={image} />
        </div>
      </Link>
      <div className={classes.content}>
        <h1 className={classes.title}>{title}</h1>
      </div>
    </div>
  );
};

export default FavouriteMovieCard;

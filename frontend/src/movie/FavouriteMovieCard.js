import React from "react";

import classes from "./FavouriteMovieCard.module.css";

const FavouriteMovieCard = (props) => {
  // from props
  const movieId = props.id;
  const image = props.image;
  const title = props.title;


  return (
    <div className={classes.card}>
      <div>
        <img alt="something" src={image} />
      </div>
      <div className={classes.content}>
        <h1 className={classes.title}>{title}</h1>
      </div>
    </div>
  );
};

export default FavouriteMovieCard;

import React from "react";

import { useSelector } from "react-redux";
import FavouriteMovieCard from "../../movie/FavouriteMovieCard";

import classes from "./FavouritesComponent.module.css";

const FavouritesComponent = () => {
  const userFavourite = useSelector((state) => state.user.favourite);
  const allMovies = useSelector((state) => state.movies.all);
  let favouriteMovies = [];

  userFavourite.forEach((favouriteId) => {
    allMovies.forEach((movie) => {
      if (favouriteId === movie._id) {
        favouriteMovies.push(movie);
      }
    });
  });

  return (
    <div className={classes.favourites}>
      {favouriteMovies.map((currentMovie) => {
        return (
          <FavouriteMovieCard
            movie={currentMovie}
            key={currentMovie._id}
          />
        );
      })}
    </div>
  );
};

export default FavouritesComponent;

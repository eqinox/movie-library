import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import FavouriteMovieCard from "../../movie/FavouriteMovieCard";

import classes from "./FavouritesComponent.module.css";

const FavouritesComponent = () => {
  const userFavourite = useSelector((state) => state.user.favourite);
  const allMovies = useSelector((state) => state.movies.all);
  let favouriteMovies = [];

  if (userFavourite) {
    userFavourite.forEach((favouriteId) => {
      allMovies.forEach((movie) => {
        if (favouriteId === movie._id) {
          console.log("vlizame li");
          favouriteMovies.push(movie);
          
        }
      });
    });
  }
  
  console.log(favouriteMovies);
  return (
    <div className={classes.favourites}>
      {favouriteMovies.map(movie => {
        return <FavouriteMovieCard
          
          title={movie.title}
          body={movie.body}
          image={
            movie.image
              ? `http://localhost:1339/${movie.image}`
              : "https://cdn.britannica.com/q:60/91/181391-050-1DA18304/cat-toes-paw-number-paws-tiger-tabby.jpg"
          }
          key={movie._id}
          id={movie._id}
        />;
      })}
    </div>
  );
};

export default FavouritesComponent;

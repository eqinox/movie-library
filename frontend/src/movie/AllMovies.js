import React from "react";

import SearchMovieCard from "./SearchMovieCard";
import './AllMovies.css'

const AllMovies = (props) => {
  const movies = props.movies;

  return (
    <div className="all-movies">
      {movies.map((movie) => (
        <SearchMovieCard
          movieForReview={movie}
          key={movie._id}
        />
      ))}
    </div>
  );
};

export default AllMovies;

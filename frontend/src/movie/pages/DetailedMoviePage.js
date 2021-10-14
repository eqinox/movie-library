import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import classes from "./DetailedMoviePage.module.css";

// import { addToFavourite } from "../store/user/user-actions";
import SearchMovieCard from "../SearchMovieCard";
import { getMovieById } from "../../store/movie/movie-actions";

const DetailedMoviePage = (props) => {
  const dispatch = useDispatch();

  const movieForReview = useSelector((state) => state.movies.movieForReview);

  // Load the movie when page loaded
  useEffect(() => {
    dispatch(getMovieById(props.match.params.id));
  }, [props.match.params.id]);

  return (
    <div className={classes.container}>
      { movieForReview && <SearchMovieCard movieForReview={movieForReview} />}
    </div>
  );
};

export default DetailedMoviePage;

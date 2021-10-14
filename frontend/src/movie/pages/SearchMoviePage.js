import React, { useEffect } from "react";

import SearchMovieForm from "../components/SearchMovieForm";
import { useSelector, useDispatch } from "react-redux";
import classes from "./SearchMoviePage.module.css";
import AllMovies from "../AllMovies";
import { getAllMovies } from "../../store/movie/movie-actions";

const SearchMoviePage = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.all);

  useEffect(() => {
    dispatch(getAllMovies());
  }, [dispatch]);

  return (
    <div className={classes.search}>
      <h2>Search</h2>
      <SearchMovieForm />
      {movies && <AllMovies movies={movies} />}
    </div>
  );
};

export default SearchMoviePage;

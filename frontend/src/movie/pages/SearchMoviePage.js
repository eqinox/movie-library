import React, { useEffect } from "react";

import SearchMovieForm from "../components/SearchMovieForm";
import { useSelector, useDispatch } from "react-redux";
import classes from "./SearchMoviePage.module.css";
import AllMovies from "../AllMovies";
import { getAllMovies } from "../../store/movie/movie-actions";
import { movieActions } from "../../store/movie/movie-slice";

const SearchMoviePage = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.all);
  const filteredMovies = useSelector((state) => state.movies.filtered);
  
  useEffect(() => {
    dispatch(getAllMovies());
  }, [dispatch]);

  const searchHandler = (text) => {
    dispatch(movieActions.getAllByTitle(text));
  };

  return (
    <div className={classes.search}>
      <h2>Search</h2>
      <SearchMovieForm searchTerm={searchHandler} />
      {movies && <AllMovies movies={filteredMovies.length > 0? filteredMovies : movies} />}
    </div>
  );
};

export default SearchMoviePage;

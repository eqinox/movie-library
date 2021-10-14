import React from "react";

import SearchForm from "../components/SearchForm";
import { useSelector } from "react-redux";
import classes from "./SearchPage.module.css";
import AllMovies from "../../../movie/AllMovies";

const SearchPage = () => {
  const movies = useSelector((state) => state.movies.all);

  return (
    <div className={classes.search}>
      <h2>Search</h2>
      <SearchForm />
      <AllMovies movies={movies} />
    </div>
  );
};

export default SearchPage;

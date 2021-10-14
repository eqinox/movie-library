import React, { useRef } from "react";

import classes from "./SearchForm.module.css";
import { useDispatch} from "react-redux";
import { getAllMovies } from "../../../store/movie/movie-actions";

const SearchForm = () => {
  const dispatch = useDispatch();
  let searchText = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(getAllMovies());
  }

  return (
    <form className={classes.search} onSubmit={submitHandler}>
      <input ref={searchText} type="text" placeholder="Search by movie title" />
      <button >Search</button>
    </form>
  );
};

export default SearchForm;

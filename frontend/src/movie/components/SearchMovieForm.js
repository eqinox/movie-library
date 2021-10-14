import React, { useRef } from "react";

import classes from "./SearchMovieForm.module.css";

const SearchMovieForm = () => {
  let searchTextRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <form className={classes.search} onSubmit={submitHandler}>
      <input
        ref={searchTextRef}
        type="text"
        placeholder="Search by movie title"
      />
      <button>Search</button>
    </form>
  );
};

export default SearchMovieForm;

import React, { useRef } from "react";

import classes from "./SearchMovieForm.module.css";

const SearchMovieForm = (props) => {
  let searchTextRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    props.searchTerm(searchTextRef.current.value);
  };

  return (
    <form className={classes.search} onSubmit={submitHandler}>
      <input
        ref={searchTextRef}
        type="search"
        placeholder="Search movie by title"
      />
      <button>Search</button>
    </form>
  );
};

export default SearchMovieForm;

import React, { Fragment } from "react";
import { useHistory } from "react-router";

import AddMovieForm from "../components/AddMovieForm";

import classes from "./AddMoviePage.module.css";

const AddMoviePage = () => {
  const history = useHistory();

  const goBackHandler = () => {
    history.goBack();
  };

  return (
    <Fragment>
      <AddMovieForm />
      <div className={classes.buttons}>
        <button type="button" onClick={goBackHandler}>
          Back
        </button>
      </div>
    </Fragment>
  );
};

export default AddMoviePage;

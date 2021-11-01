import React, { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { getMovieById } from "../../store/movie/movie-actions";

import EditMovieForm from "../components/EditMovieForm";

import classes from "./EditMoviePage.module.css";

const EditMoviePage = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const goBackHandler = () => {
    history.goBack();
  };

  useEffect(() => {
    dispatch(getMovieById(props.match.params.id))
  }, [props.match.params.id, dispatch]);

  return (
    <Fragment>
      <EditMovieForm />
      <div className={classes.buttons}>
        <button type="button" onClick={goBackHandler}>
          Back
        </button>
      </div>
    </Fragment>
  );
};

export default EditMoviePage;

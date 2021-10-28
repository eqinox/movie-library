import React, { useRef } from "react";

import classes from "./AddMovieForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { notificationActions } from "../../store/notification/notification-slice";
import { useHistory } from "react-router-dom";

const EditMovieForm = () => {
  // TODO: set selectedGenres and add changing genre
  const dispatch = useDispatch();
  const history = useHistory();
  const userToken = useSelector((state) => state.user.token);
  const movie = useSelector((state) => state.movies.movieForReview);

  let title = useRef();
  let body = useRef();
  let duration = useRef();

  if (movie.title && movie.body && movie.duration) {
    title.current.value = movie.title;
    body.current.value = movie.body;
    duration.current.value = movie.duration;
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("title", title.current.value);
    formData.append("body", body.current.value);
    formData.append("duration", duration.current.value);

    try {
      const response = await fetch(`http://localhost:1339/movie/${movie}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (data.error) {
        dispatch(
          notificationActions.showDefaultNotification({
            status: "error",
            message: data.error.message,
          })
        );
      } else {
        dispatch(
          notificationActions.showDefaultNotification({
            message: data.message,
            status: "success",
          })
        );
        history.replace("/welcome");
      }
    } catch (err) {
      dispatch(
        notificationActions.showDefaultNotification({
          status: "error",
          message: err.toString(),
        })
      );
    }
  };

  return (
    <div className={classes.auth}>
      <h1>Edit Movie</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" required ref={title} />
        </div>
        <div className={classes.control}>
          <label htmlFor="body">Body</label>
          <textarea id="body" required ref={body} />
        </div>
        <div className={classes.control}>
          <label htmlFor="duration">Duration</label>
          <input type="number" id="duration" required ref={duration} />
        </div>
        <div className={classes.actions}>
          <button>Create</button>
        </div>
      </form>
    </div>
  );
};

export default EditMovieForm;

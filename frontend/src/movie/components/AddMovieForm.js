import React, { useRef } from "react";

import classes from "./AddMovieForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { notificationActions } from "../../store/notification/notification-slice";
import { useHistory } from "react-router-dom";
import ImageUpload from "../../shared/components/UI/ImageUpload";

const AddMovieForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userToken = useSelector((state) => state.user.token);
  let image;

  let title = useRef();
  let body = useRef();
  let duration = useRef();
  let genre = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("image", image);
    formData.append("title", title.current.value);
    formData.append("body", body.current.value);
    formData.append("genre", genre.current.value);
    formData.append("duration", duration.current.value);
    
    try {
      const response = await fetch("http://localhost:1339/movie/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        body: formData,
      });

      const data = await response.json();
      console.log(data);
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

  const imageHandler = (incomingImage) => {
    image = incomingImage;
  };

  return (
    <div className={classes.auth}>
      <h1>Add Article</h1>
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
          <label htmlFor="genre">Genre</label>
          <textarea id="genre" required ref={genre} />
        </div>
        <div className={classes.control}>
          <label htmlFor="duration">Duration</label>
          <textarea id="duration" required ref={duration} />
        </div>
        <ImageUpload onImageUpload={imageHandler} />
        <div className={classes.actions}>
          <button>Create</button>
        </div>
      </form>
    </div>
  );
};

export default AddMovieForm;

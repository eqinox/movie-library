import React, { useRef, useState } from "react";

import classes from "./AddMovieForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { notificationActions } from "../../store/notification/notification-slice";
import { useHistory } from "react-router-dom";
import ImageUpload from "../../shared/UI/ImageUpload";

const genres = [
  "Horror",
  "Action",
  "Comedy",
  "Drama",
  "Fantasy",
  "Mystery",
  "Romance",
  "Thriller",
  'Other',
];

const AddMovieForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userToken = useSelector((state) => state.user.token);
  const [genresState, setGenresState] = useState([]);

  let image;

  let title = useRef();
  let body = useRef();
  let duration = useRef();
  // let genresRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("image", image);
    formData.append("title", title.current.value);
    formData.append("body", body.current.value);
    console.log(genresState);
    formData.append("genres", genresState);
    formData.append("duration", duration.current.value);

    try {
      const response = await fetch("http://localhost:1339/movie/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(formData),
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

  const imageHandler = (incomingImage) => {
    image = incomingImage;
  };

  // add & remove genre from array
  const genresHandler = (event) => {
    const index = genresState.indexOf(event.target.value);
    if (index == -1) {
      genresState.push(event.target.value);      
      setGenresState(genresState);
    } else {
      genresState.splice(index, 1);
      setGenresState(genresState);
    }
  };

  return (
    <div className={classes.auth}>
      <h1>Add Movie</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" required ref={title} />
        </div>
        <div className={classes.control}>
          <label htmlFor="body">Body</label>
          <textarea id="body" required ref={body} />
        </div>
        <div className={classes.control + " " + classes.genres}>
          {genres.map((genre) => {
            return (
              <div key={genre}>
                <label htmlFor={genre}>{genre}</label>
                <input
                  type="checkbox"
                  id={genre}
                  name="genre"
                  value={genre}
                  onChange={genresHandler}
                />
              </div>
            );
          })}
        </div>
        <div className={classes.control}>
          <label htmlFor="duration">Duration</label>
          <input type="number" id="duration" required ref={duration} />
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

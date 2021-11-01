import React, { useRef, useState } from "react";

import classes from "./AddMovieForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { editMovie } from "../../store/movie/movie-actions";

const genres = [
  "Horror",
  "Action",
  "Comedy",
  "Drama",
  "Fantasy",
  "Mystery",
  "Romance",
  "Thriller",
  "Other",
];

const EditMovieForm = () => {
  // TODO: update genre view on click
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.user.token);
  const movie = useSelector((state) => state.movies.movieForReview);
  let movieGenres; // used for the post request
  // const [genresState, setGenresState] = useState([]);

  let title = useRef();
  let body = useRef();
  let duration = useRef();
  let selectedGenres; // to render all selected genres

  // add & remove genre from array
  const genresHandler = (event) => {
    // const index = genresState.indexOf(event.target.value);
    const indexOfCopyGenres = movieGenres.indexOf(event.target.value);

    // if (index === -1) {
    //   genresState.push(event.target.value);
    //   setGenresState(genresState);
    // } else {
    //   genresState.splice(index, 1);
    //   setGenresState(genresState);
    // }

    if (indexOfCopyGenres === -1) {
      movieGenres.push(event.target.value);
      // setGenresState(movieGenres); // This will confuse the application
    } else {
      movieGenres.splice(indexOfCopyGenres, 1);
      // setGenresState(movieGenres); // This will confuse the application
    }
    console.log(movieGenres);
  };

  // TODO: HOW TO do it better???
  if (
    title.current &&
    body.current &&
    duration.current &&
    movie.title &&
    movie.body &&
    movie.duration &&
    movie.genres
  ) {
    title.current.value = movie.title;
    body.current.value = movie.body;
    duration.current.value = movie.duration;

    movieGenres = movie.genres.slice();
    selectedGenres = genres.map((genre) => {
      const initialChecked = movieGenres.includes(genre);
      return (
        <div key={genre}>
          <label htmlFor={genre}>{genre}</label>
          <input
            type="checkbox"
            id={genre}
            name="genre"
            value={genre}
            checked={initialChecked}
            onChange={genresHandler}
          />
        </div>
      );
    });
  }

  const submitHandler = async (event) => {
    event.preventDefault();

    const edittedMovie = {
      title: title.current.value,
      body: body.current.value,
      duration: duration.current.value,
      genres: movieGenres,
    };

    dispatch(editMovie(movie._id, userToken, edittedMovie));
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

        <div className={classes.control + " " + classes.genres}>
          {selectedGenres}
        </div>

        <div className={classes.control}>
          <label htmlFor="duration">Duration</label>
          <input type="number" id="duration" required ref={duration} />
        </div>
        <div className={classes.actions}>
          <button>Edit</button>
        </div>
      </form>
    </div>
  );
};

export default EditMovieForm;

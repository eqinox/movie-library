import React from "react";

import { useDispatch, useSelector } from "react-redux";

import classes from "./SearchMovieCard.module.css";

import { addToFavourite } from "../store/user/user-actions";
import { Link } from "react-router-dom";
import { deleteMovie } from "../store/movie/movie-actions";

const defaultImage =
  "https://cdn.britannica.com/q:60/91/181391-050-1DA18304/cat-toes-paw-number-paws-tiger-tabby.jpg";

const SearchMovieCard = (props) => {
  const dispatch = useDispatch();

  // from state
  const userFavourite = useSelector((state) => state.user.favourite);
  const userToken = useSelector((state) => state.user.token);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userId = useSelector((state) => state.user.id);

  // from props
  const movie = props.movieForReview;
  const movieId = movie._id;
  const isInFavourite = userFavourite ? userFavourite.includes(movieId) : false;
  const body = movie.body ? movie.body.substring(0, 350) : null;
  const image = movie.image
    ? `http://localhost:1339/${movie.image}`
    : defaultImage;
  const title = movie.title;
  const genres = movie.genres;
  const duration = movie.duration;

  // Handlers
  const deleteHandler = async () => {
    dispatch(deleteMovie(movieId, userToken));
  };

  const editHandler = async () => {
    // TODO
  };

  const favouriteHandler = () => {
    if (isInFavourite) {
      dispatch(addToFavourite(movieId, userToken, "remove"));
    } else {
      dispatch(addToFavourite(movieId, userToken, "add"));
    }
  };

  let favouriteText;
  let favouriteClass;
  if (isInFavourite) {
    favouriteClass = classes.favourite + " " + classes.favouriteOut;
    favouriteText = "Remove from favourite";
  } else {
    favouriteText = "Add to favourite";
    favouriteClass = classes.favourite + " " + classes.favouriteIn;
  }
  console.log(props);
  if (title) {
    return (
      <div className={classes.card}>
        <Link to={`/movie/view/${movieId}`}>
          <div>
            <img alt="something" src={image} />
          </div>
        </Link>
        <div className={classes.content}>
          <h1>{title}</h1>
          <div className={classes.info}>
            <p>{genres.join(", ")}</p>
            <p>Duration: {duration}m</p>
          </div>
          <div className={classes.text}>{body}</div>
          <div className={classes.actions}>
            {isLoggedIn && (
              <button onClick={favouriteHandler} className={favouriteClass}>
                {favouriteText}
              </button>
            )}
            {userId === movie.owner && (
              <button type="button" onClick={deleteHandler}>
                Delete
              </button>
            )}
            {userId === movie.owner && (
              <Link to={`/movie/edit/${movieId}`}>
                <button type="button" onClick={editHandler}>
                  Edit
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return <div className={classes.card}>No Movie Found</div>;
  }
};

export default SearchMovieCard;

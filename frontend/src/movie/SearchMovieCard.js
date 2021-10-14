import React from "react";

import { useDispatch, useSelector } from "react-redux";

import classes from "./SearchMovieCard.module.css";

import { addToFavourite } from "../store/user/user-actions";
import { Link } from "react-router-dom";

const SearchMovieCard = (props) => {
  const dispatch = useDispatch();

  // from state
  const userFavourite = useSelector((state) => state.user.favourite);
  const userToken = useSelector((state) => state.user.token);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  // from props
  const movie = props.movieForReview;
  const movieId = movie._id;
  const isInFavourite = userFavourite ? userFavourite.includes(movieId) : null;
  const body = movie.body ? movie.body.substring(0, 350) : null;
  const image = movie.image
    ? `http://localhost:1339/${movie.image}`
    : "https://i.natgeofe.com/n/46b07b5e-1264-42e1-ae4b-8a021226e2d0/domestic-cat_thumb_square.jpg";
  const title = movie.title;
  const genre = movie.genre;
  const duration = movie.duration;

  // Handlers
  const deleteHandler = async () => {
    // TODO
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

  if (title) {
    return (
      <div className={classes.card}>
        <Link to={`/movie/view/${movieId}`}>
          <div>
            <img alt="something" src={image} />
          </div>
        </Link>
        <div className={classes.content}>
          <h1 className={classes.title}>{title}</h1>
          <div className={classes.info}>
            <p>Drama, Thriller, Comedy</p>
            <p> 90 minutes</p>
          </div>
          <div className={classes.text}>{body}</div>
          {isLoggedIn && (
            <button onClick={favouriteHandler} className={favouriteClass}>
              {favouriteText}
            </button>
          )}
        </div>
      </div>
    );
  } else {
    return <div className={classes.card}>No Movie Found</div>;
  }
};

export default SearchMovieCard;

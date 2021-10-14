import React from "react";

import { useDispatch, useSelector } from "react-redux";

import classes from "./SearchMovieCard.module.css";

import { addToFavourite } from "../store/user/user-actions";

const SearchMovieCard = (props) => {
  const dispatch = useDispatch();

  // from state
  const userFavourite = useSelector((state) => state.user.favourite);
  const userToken = useSelector((state) => state.user.token);

  // from props
  const movieId = props.id;
  const isInFavourite = userFavourite ? userFavourite.includes(movieId) : null;

  // Handlers
  const deleteHandler = async () => {
    // TODO
  };

  const editHandler = async () => {
    // TODO
  };

  const favouriteHandler = () => {
    // if (!userFavourite) {
    //   return;
    // }
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

  return (
    <div className={classes.card}>
      <div>
        <img alt="something" src={props.image} />
      </div>
      <div className={classes.content}>
        <h1 className={classes.title}>{props.title}</h1>
        <div className={classes.info}>
          <p>Drama, Thriller, Comedy</p>
          <p>| 90 minutes</p>
        </div>
        <div className={classes.text}>{props.body.substring(0, 350)}</div>
        <button onClick={favouriteHandler} className={favouriteClass}>
          {favouriteText}
        </button>
      </div>
    </div>
  );
};

export default SearchMovieCard;

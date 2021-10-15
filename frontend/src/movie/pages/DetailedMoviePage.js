import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import classes from "./DetailedMoviePage.module.css";

// import { addToFavourite } from "../store/user/user-actions";
import SearchMovieCard from "../SearchMovieCard";
import { getMovieById } from "../../store/movie/movie-actions";
import { addNote } from "../../store/user/user-actions";

const DetailedMoviePage = (props) => {
  const [noteText, setNoteText] = useState();
  const userToken = useSelector((state) => state.user.token);
  const userNotes = useSelector((state) => state.user.notes);
  const movieForReview = useSelector((state) => state.movies.movieForReview);
  const showShortNotification = useSelector(
    (state) => state.notification.shortNotification
  );
  const dispatch = useDispatch();

  // Load the movie when page loaded
  useEffect(() => {
    dispatch(getMovieById(props.match.params.id));
  }, [props.match.params.id]);

  // send note text on every note change
  useEffect(() => {
    const identifier = setTimeout(() => {
      dispatch(addNote(noteText, userToken));
    }, 1000);

    // cleanup function
    return () => {
      clearTimeout(identifier);
    };
  }, [noteText]);

  // Get note data
  useEffect(() => {
    console.log('first')
    if (      
      movieForReview &&
      userNotes.some((item) => item.movie === movieForReview._id)
    ) {
      console.log('true')
      const index = userNotes.findIndex(
        (item) => item.movie === movieForReview._id
      );
      setNoteText(userNotes[index].text);
    }
  }, [userNotes]);

  const changeNoteHandler = (event) => {
    setNoteText(event.target.value);
  };

  return (
    <div className={classes.container}>
      {movieForReview && <SearchMovieCard movieForReview={movieForReview} />}
      <div className={classes.noteContainer}>
        <textarea
          value={noteText}
          onChange={changeNoteHandler}
          placeholder="Your private notes and comments about the movie"
        />
        <p
          className={
            showShortNotification
              ? classes.noteInfo + " " + classes.show
              : classes.noteInfo + " " + classes.hide
          }
        >
          Note Saved
        </p>
      </div>
    </div>
  );
};

export default DetailedMoviePage;

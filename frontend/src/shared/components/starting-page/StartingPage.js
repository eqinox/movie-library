import React, { useEffect } from "react";

import "./StartingPage.css";

import { useDispatch, useSelector } from "react-redux";
import FavouritesComponent from "../../../user/favourites/FavouritesComponent";
import { getAllMovies } from "../../../store/movie/movie-actions";

const StartingPage = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    dispatch(getAllMovies());
  }, []);

  return (
    <section className="starting">
      {isLoggedIn && <h1>Your Favourites</h1>}

      {isLoggedIn && <FavouritesComponent />}
    </section>
  );
};

export default StartingPage;

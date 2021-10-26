import React, { useEffect } from "react";

import "./StartingPage.css";

import { useDispatch, useSelector } from "react-redux";
import FavouritesComponent from "../../user/favourites/FavouritesComponent";
import { getAllMovies } from "../../store/movie/movie-actions";
// import AllMovies from "../../../movie/AllMovies";

const StartingPage = () => {
  const dispatch = useDispatch();
  const userFavourite = useSelector((state) => state.user.favourite);
  // const movies = useSelector((state) => state.movies.all);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    dispatch(getAllMovies());
  }, []);
  
  return (
    <section className="starting">
      {isLoggedIn && userFavourite.length !== 0 && <h1>Your Favourites</h1>}

      <FavouritesComponent />
      {isLoggedIn && userFavourite.length === 0 && <h1>No Favourites</h1>}
    </section>
  );
};

export default StartingPage;

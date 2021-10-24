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
      {isLoggedIn && <h1>Your Favourites</h1>}

      {isLoggedIn && <FavouritesComponent />}
      {isLoggedIn && userFavourite.length === 0 && <div>No Favourites</div>}
    </section>
  );
};

export default StartingPage;

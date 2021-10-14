import React from "react";

import "./StartingPage.css";

import { useSelector } from "react-redux";
import AllMovies from "../../../movie/AllMovies";
import FavouritesComponent from "../../../user/favourites/FavouritesComponent";

const StartingPage = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <section className="starting">
      <h1>Your Favourites</h1>
      
      {isLoggedIn && <FavouritesComponent />}
    </section>
  );
};

export default StartingPage;

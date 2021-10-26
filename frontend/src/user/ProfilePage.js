import React from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import "./ProfilePage.css";
import FavouritesComponent from "./favourites/FavouritesComponent";

const ProfilePage = () => {
  const user = useSelector((state) => state.user);
  const userFavourite = useSelector((state) => state.user.favourite);

  return (
    <section className="profile">
      <h1>Welcome {user.email}!</h1>
      {userFavourite.length !== 0 && <h2>Your Favourites</h2>}
      <FavouritesComponent/>
      <Link to='/movies/add'><button>Add Movie</button></Link>
    </section>
  );
};

export default ProfilePage;

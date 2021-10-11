import React from "react";

import "./StartingPage.css";

import { useSelector } from "react-redux";
import AllMovies from "../../../movie/AllMovies";

const StartingPage = () => {
  const user = useSelector((state) => state.user);

  return (
    <section className="starting">
      <h1>Welcome {user.email}!</h1>
      
      <AllMovies />
    </section>
  );
};

export default StartingPage;

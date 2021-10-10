import React from "react";

import "./StartingPage.css";

import { useSelector } from "react-redux";

const StartingPage = () => {
  const user = useSelector((state) => state.user);

  return (
    <section className="starting">
      <h1>Welcome {user.email}!</h1>
      
      All Movies
    </section>
  );
};

export default StartingPage;

import React from "react";
import { Link } from "react-router-dom";

import classes from "./Background.module.css";

const Background = () => {
  return (
    <div className={classes.background}>
      <h1>Heading</h1>
      <p>
        What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing
        and typesetting industry.
      </p>
      <Link to="/search">
        <button>Search</button>
      </Link>
    </div>
  );
};

export default Background;

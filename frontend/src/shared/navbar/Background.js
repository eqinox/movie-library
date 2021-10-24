import React from "react";
import { Link } from "react-router-dom";

import classes from "./Background.module.css";

const Background = () => {
  return (
    <div className={classes.background}>
      <h1>Heading</h1>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley
      </p>
      <Link to="/search">
        <button>Search</button>
      </Link>
    </div>
  );
};

export default Background;

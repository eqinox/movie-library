import React from "react";
import { Link } from "react-router-dom";

import "./MainNavigation.css";

const MainNavigation = () => {

  return (
    <header className="header">
      <Link to="/">
        <div className="logo">Movie Library</div>
      </Link>

      <nav>
        <ul>
          <li><Link to="/auth">Login</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li>
            <button>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;

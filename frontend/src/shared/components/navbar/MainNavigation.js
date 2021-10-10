import React from "react";
import { Link, useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../store/user/user-slice";

import "./MainNavigation.css";

const MainNavigation = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const logoutHandler = () => {
    dispatch(userActions.logout());

    history.replace("/auth");
  };

  return (
    <header className="header">
      <Link to="/">
        <div className="logo">Movie Library</div>
      </Link>

      <nav>
        <ul>
        <li>{!isLoggedIn && <Link to="/auth">Login</Link>}</li>
          <li>{isLoggedIn && <Link to="/profile">Profile</Link>}</li>
          <li>
            {isLoggedIn && <button onClick={logoutHandler}>Logout</button>}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;

import React from "react";
import { Link, useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/user/user-slice";

import "./MainNavigation.css";
import SearchMovieForm from "../../movie/components/SearchMovieForm";
import { movieActions } from "../../store/movie/movie-slice";

const MainNavigation = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const logoutHandler = () => {
    dispatch(userActions.logout());

    history.replace("/auth");
  };

  const searchHandler = (text) => {
    dispatch(movieActions.getAllByTitle(text));

    history.replace('/search')
  };

  return (
    <header className="header">
      <Link to="/">
        <div className="logo">Movie Library</div>
      </Link>

      <nav>
        <ul>
          <li>
          <SearchMovieForm searchTerm={searchHandler}/>
          </li>
          <li>{!isLoggedIn && <Link to="/auth">Authenticate</Link>}</li>
          <li>{isLoggedIn && <Link to="/profile"><button>Profile</button></Link>}</li>
          <li>
            {isLoggedIn && <button onClick={logoutHandler}>Logout</button>}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;

import React, { Fragment, useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";

import MainNavigation from "./shared/navbar/MainNavigation";
import StartingPage from "./shared/starting-page/StartingPage";
import ProfilePage from "./user/ProfilePage";
import AuthForm from "./user/AuthForm";
import Notification from "./shared/UI/Notification";
import { notificationActions } from "./store/notification/notification-slice";
import AddMoviePage from "./movie/pages/AddMoviePage";
import Background from "./shared/navbar/Background";
import SearchMoviePage from "./movie/pages/SearchMoviePage";
import DetailedMoviePage from "./movie/pages/DetailedMoviePage";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const defaultNotification = useSelector(
    (state) => state.notification.defaultNotification
  );
  const shortNotification = useSelector((state) => state.notification.shortNotification);

  useEffect(() => {
    const identifier = setTimeout(() => {
      dispatch(notificationActions.hideDefaultNotification());
    }, 5000);

    return () => {
      clearTimeout(identifier);
    };
  }, [defaultNotification]);

  useEffect(() => {
    const identifier = setTimeout(() => {
      dispatch(notificationActions.hideShortNotification());
    }, 3000);

    return () => {
      clearTimeout(identifier);
    };
  }, [shortNotification]);

  return (
    <Fragment>
      <MainNavigation />
      {defaultNotification.show && (
        <Notification
          status={defaultNotification.status}
          message={defaultNotification.message}
        />
      )}
      <Switch>
        <Route path="/" exact>
          <Redirect to="/welcome" />
        </Route>
        <Route path="/welcome">
          <Background />
          <StartingPage />
        </Route>

        {isLoggedIn && (
          <Route path="/profile">
            <ProfilePage />
          </Route>
        )}

        {!isLoggedIn && (
          <Route path="/auth">
            <AuthForm />
          </Route>
        )}

        {isLoggedIn && (
          <Route path="/movies/add">
            <AddMoviePage />
          </Route>
        )}

        <Route path="/search">
          <SearchMoviePage />
        </Route>

        <Route path="/movie/view/:id" component={DetailedMoviePage} />

        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;

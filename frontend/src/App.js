import React, { Fragment, useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";

import MainNavigation from "./shared/components/navbar/MainNavigation";
import StartingPage from "./shared/components/starting-page/StartingPage";
import ProfilePage from "./user/ProfilePage";
import AuthForm from "./user/AuthForm";
import Notification from "./shared/components/UI/Notification";
import { notificationActions } from "./store/notification/notification-slice";
import AddMoviePage from "./movie/pages/AddMoviePage";
import Background from "./shared/components/navbar/Background";
import SearchPage from "./shared/search/pages/SearchPage";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const defaultNotification = useSelector(
    (state) => state.notification.defaultNotification
  );

  useEffect(() => {
    const identifier = setTimeout(() => {
      dispatch(notificationActions.hideDefaultNotification());
    }, 5000);

    return () => {
      clearTimeout(identifier);
    };
  }, [defaultNotification]);

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
          <SearchPage />
        </Route>

        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;

import React, { Fragment } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import "./App.css";

import MainNavigation from "./shared/components/navbar/MainNavigation";
import StartingPage from "./shared/components/starting-page/StartingPage";
import ProfilePage from "./user/ProfilePage";
import AuthForm from "./user/AuthForm";

function App() {
  return (
    <Fragment>
      <MainNavigation />
      <Switch>
        <Route path="/" exact>
          <Redirect to="/welcome" />
        </Route>
        <Route path="/welcome">
          <StartingPage />
        </Route>

        <Route path="/profile">
          <ProfilePage />
        </Route>

        <Route path="/auth">
          <AuthForm />
        </Route>

        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;

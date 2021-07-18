import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MoviesCollection from './MoviesCollection';
import LoginPage from './users/LoginPage';
import RegisterPage from './users/RegisterPage';

const Routes = () => (
    <Switch>
        <Route path='/' exact component={MoviesCollection} />
        <Route path='/users/register' exact component={RegisterPage} />
        <Route path='/users/login' exact component={LoginPage} />
    </Switch>
)

export default Routes
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MoviesPage from './Movies';
import LoginPage from './users/LoginPage';
import RegisterPage from './users/RegisterPage';

const Routes = () => (
    <Switch>
        <Route path='/' exact component={MoviesPage} />
        <Route path='/users/register' exact component={RegisterPage} />
        <Route path='/users/login' exact component={LoginPage} />
    </Switch>
)

export default Routes
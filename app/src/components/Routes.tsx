import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MoviesCollection from './MoviesCollection';
import LoginPage from './users/LoginPage';
import RegisterForm from './users/RegisterForm';

const Routes = () => (
    <Switch>
        <Route path='/' exact component={MoviesCollection} />
        <Route path='/users/register' exact component={RegisterForm} />
        <Route path='/users/login' exact component={LoginPage} />
    </Switch>
)

export default Routes
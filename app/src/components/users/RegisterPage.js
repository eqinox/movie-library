import React, {Component} from "react";
import {Button, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators} from '../../redux/index.ts';

import RegisterForm from "./RegisterForm";



export default class RegisterPage extends Component {
    constructor (props) {
        super (props);
        
        this.state = {
            user: {}
        }
    }

    render () {
        return (
            <div>
                <h1>Register User</h1>
                <RegisterForm user={ this.state.user } handleSubmit={this.handleSubmit}/>
            </div>
        )
    }
}



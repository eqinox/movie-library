import React, {Component} from "react";
import { bindActionCreators } from 'redux';
import { actionCreators} from '../../redux/index';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form} from 'react-bootstrap';
import { reduxForm } from 'redux-form';
import { registerUser } from '../../redux/user/userActions'
import { User } from "../../models/user";

const RegisterForm = (props) => {
    const users = useSelector((state) => state);
    console.log(users);
    const dispatch = useDispatch();

    const { registerUser } = bindActionCreators(actionCreators, dispatch);

    function handleSubmit(e){        
        e.preventDefault();
        if (props.user.password !== props.user.confirmPassword) {
            alert("Passwords doesn't match");
            return;
        }
    }

    function handleEmail(e) {
        props.user.email = e.target.value;
    }

    function handlePassword(e) {
        props.user.password = e.target.value;
    }

    function handleConfirmPassword(e) {
        props.user.confirmPassword = e.target.value;
    }

    return (
        <form onSubmit={handleSubmit} className='container w-25'>
            <div className="col-sm-6 mx-auto">
                <label htmlFor="email">Email address</label>
                <input id="email" type="email" className="form-control" name="email" placeholder="Email address" onChange={handleEmail} value={props.user.email} />
            </div>
            
            <div className="col-sm-6 mx-auto">
                <label htmlFor="password">Password</label>
                <input id="password" type="password" className="form-control" name="password" placeholder="Password" onChange={handlePassword} value={props.user.password} />
            </div>

            <div className="col-sm-6 mx-auto">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input id="confirmPassword" type="password" className="form-control" name="confirmPassword" placeholder="Comfirm Password" onChange={handleConfirmPassword} value={props.user.confirmPassword} />
            </div>

            <div className="col-sm-4 mx-auto">
                <input  type="submit" className="form-control" onClick={() => registerUser(props.user)} value="Register" />
            </div>
        </form>
    );
}

export default RegisterForm;
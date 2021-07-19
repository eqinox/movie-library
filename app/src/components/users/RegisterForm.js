import React, {Component} from "react";
import { bindActionCreators } from 'redux';
import { actionCreators} from '../../redux/index.ts';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form} from 'react-bootstrap';
import { reduxForm } from 'redux-form';
import { registerUser } from '../../redux/user/userActions'

export default function RegisterForm () {
    const users = useSelector((state) => state);
    console.log(users);
    const dispatch = useDispatch();

    // const AC = bindActionCreators(actionCreators, dispatch);

    // console.log(AC);
    
    return (
        <Form className='container w-25'>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm Password" />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={() => dispatch(registerUser)}>
                Register
            </Button>
        </Form>
    );
}
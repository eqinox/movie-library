import React, {Component} from "react";
import {Button, Alert, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


class LoginPage extends Component {
    render () {
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
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
            </Form.Group>
            <Button variant="primary" type="submit">
                Login
            </Button>
            </Form>
        );
    }
}

export default LoginPage
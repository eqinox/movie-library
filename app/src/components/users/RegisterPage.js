import React, {Component} from "react";
import {Button, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators} from '../../redux/index.ts';



export class RegisterPage extends Component {
    constructor (props) {
        super (props);
        
        this.state = {
            user: {
                email: 'test@test.com',
                password: '1234'

            },
            error: {

            }
        }
        
    }
    
    handleUserChange (event) {
        const target = event.target;
        const field = target.name;
        const value = target.value;
        let user = this.state.user;
        user[field] = value;
        
        this.setState({ user });
    }

    handleUserRegistration (event) {
        event.preventDefault();
        
    }

    render () {
        return (
            <Form className='container w-25'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control value={this.state.user.email} type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
        )
    }
}



import React from 'react';
import { Link } from 'react-router-dom';
import {Button, Alert} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => (
    <nav className='navbar navbar-light bg-light'>
        <div className='menu container-fluid'>
            <Link className="navbar-brand" to='/users/register'>Register</Link>
            <Link className="navbar-brand" to='/users/login'>Login</Link>
            <form className='d-flex'>
                <input type='search' placeholder='Search by movie title...' className='form-control me2' />
                <Link to='/search'>
                    <button className='btn btn-outline-success'>Search</button>
                </Link>
                
            </form>
        </div>
    </nav>
)

export default Navbar
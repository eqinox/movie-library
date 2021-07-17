import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Routes from './components/Routes';
import logo from './logo.svg';
import './App.css';
import './button.css';

class App extends Component {
  render() {
    let data = [
      { id: 1, name: 'vankata', age:12 },
      { id: 2, name: 'ivan', age:15 }
    ];
    let firstName = "peshoooooooooooooooooo";
  
    let catsList = data.map(cat => (
      <li key={cat.id}>
        My name is {cat.name }. that's it.
      </li>
    ))
    return (
      <div className="App">
        <Navbar />
        <Routes />
      </div>      
      
      
    );
  }
}

export default App;

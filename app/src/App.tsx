import React, { Component } from 'react';
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
      <div>
        <ul>
          {catsList}        
        </ul>
        <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <div className="Button">{firstName}</div>
      </div>
      </div>
      
      
    );
  }
}

export default App;

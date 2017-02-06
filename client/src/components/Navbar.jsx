import React, { Component } from 'react';
import logo from '../images/logo.svg';
import '../styles/App.css';

class Navbar extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Gift List Magic</h2>
        </div>
      </div>
    );
  }
}

export default Navbar;

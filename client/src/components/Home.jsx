import React, { Component } from 'react';
import LogInForm from './LogInForm';

// Home  & Sign-in page
class Home extends Component {
  render() {
    return (
      <div className="App">
          <h2> Welcome to the Gift List Manager </h2>

          <LogInForm />

      </div>

    );
  }
}

export default Home;

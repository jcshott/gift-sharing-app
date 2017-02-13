import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import UserListsHandler from '../containers/UserListsHandler';

// Main container element
class App extends Component {
  render() {
    return (
      <div className="App">
          <Navbar />
          <UserListsHandler />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import CurrentUserLists from '../containers/CurrentUserLists';

// Main container element
class App extends Component {
  render() {
    return (
      <div className="App">
          <Navbar />
          <CurrentUserLists />
      </div>
    );
  }
}

export default App;

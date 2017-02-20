import React, { Component } from 'react';
import Navbar from '../components/Navbar';

// Main container element
class App extends Component {
  render() {
    return (
      <div className="App">
          <Navbar />
          {this.props.children}
      </div>

    );
  }
}

export default App;

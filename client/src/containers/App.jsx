import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import CurrentUserLists from '../containers/CurrentUserLists';
import VisibleGiftList from '../containers/VisibleGiftList';

// Main container element
class App extends Component {
  render() {
    return (
      <div className="App">
          <Navbar />
          <CurrentUserLists />
          <VisibleGiftList listId={this.props.params.id} />
      </div>
    );
  }
}

export default App;

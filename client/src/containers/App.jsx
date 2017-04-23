import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../components/Navbar';
// import UserError from '../components/UserErrors';

// {this.props.errors &&
// <UserErrors errors={errors} />
// }
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

export default connect(
    state => ({
        errors: state.get('errors'),
    })
)(App);

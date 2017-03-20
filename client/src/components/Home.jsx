import React from 'react';
import { connect } from 'react-redux';
import LogInForm from './LogInForm';

// Home  & Sign-in page
class Home extends React.Component {
  renderWelcome() {
      if (this.props.currentUser) {
          return (
              <div>
                  Welcome back {this.props.currentUser.get('username')}
              </div>
          )
      }

      return <LogInForm />

  }
  render() {
    return (
      <div className="App">
          <h2> Welcome to the Gift List Manager </h2>

          {this.renderWelcome()}

      </div>

    );
  }
}

function mapStateToProps(state) {
    return {
        currentUser: state.get('currentUser'),
    }
}

export default connect(mapStateToProps)(Home);

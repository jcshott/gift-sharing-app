import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../components/Navbar';
import { userFromToken } from '../actions/actions';

// import UserError from '../components/UserErrors';

// {this.props.errors &&
// <UserErrors errors={errors} />
// }
// Main container element
class App extends Component {
    componentWillMount() {
        this.props.loadUserFromToken();
    }
    render() {
        return (
          <div className="App">
              <Navbar />
              {this.props.children}
          </div>

        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        errors: state.get('errors'),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadUserFromToken: () => {
            let token = localStorage.getItem('jwtToken');
            //if there is no token, don't bother
            if(!token || token === '') {
                return;
            }
            dispatch(userFromToken(token))
        },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

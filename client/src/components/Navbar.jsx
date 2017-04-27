import React, { Component } from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { logOut } from '../actions/actions';
import '../styles/App.css';

class Navbar extends Component {

	render() {
		return (
		  <div className="App">
			  <Nav bsStyle="tabs" activeKey="1">
				  <LinkContainer to={{ pathname: '/'}}>
					  <NavItem>Home</NavItem>
				  </LinkContainer>
				<LinkContainer to={{ pathname: '/lists'}}>
				 	<NavItem>Go to Your Lists</NavItem>
				 </LinkContainer>
			  </Nav>
			  <Nav pullRight>
				  <NavItem onClick={this.props.onLogout} href="#">Log Out</NavItem>
			  </Nav>

		  </div>
		);
	}
}

function mapStateToProps(state) {
    return {
        currentUser: state.get('currentUser'),
    }
}

function mapDispatchToProps(dispatch){
	return {
        onLogout: () => {
            localStorage.removeItem('jwtToken'); //remove token from storage
            dispatch(logOut());
        },
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

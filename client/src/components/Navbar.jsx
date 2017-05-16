import React, { Component } from 'react';
import { Navbar as BootstrapNav, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { logOut } from '../actions/actions';
import '../styles/App.css';

class Navbar extends Component {
	renderLogout() {
		if(this.props.currentUser){
			return(
				<Nav pullRight>
					<NavItem onClick={this.props.onLogout} href="#">Log Out</NavItem>
				</Nav>
			)
		}
	}

	render() {
		let showLogout = this.renderLogout();
		return (
		  <div className="App">
			  <BootstrapNav collapseOnSelect>
				<BootstrapNav.Collapse>
					<Nav>
						<LinkContainer to={{ pathname: '/'}}>
							<NavItem>Home</NavItem>
						</LinkContainer>
						<LinkContainer to={{ pathname: '/lists'}}>
							<NavItem>Go to Your Lists</NavItem>
						</LinkContainer>
					</Nav>
					{showLogout}
				</BootstrapNav.Collapse>
			  </BootstrapNav>
		  </div>
		);
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

export default connect(null, mapDispatchToProps)(Navbar);

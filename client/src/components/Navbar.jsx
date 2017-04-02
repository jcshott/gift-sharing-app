import React, { Component } from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
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

		  </div>
		);
	}
}

export default Navbar;

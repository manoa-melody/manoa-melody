import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight } from 'react-bootstrap-icons';

/**
 * Renders the navbar component for the app
 */
const NavBar = () => {
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <h2 id="title">Mānoa Melody</h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-end">
            {currentUser && !Roles.userIsInRole(Meteor.userId(), 'admin') ? ([
              <Nav.Link id="add-event-page" as={NavLink} to="/add-event" key="add-event">Add Event</Nav.Link>,
              <Nav.Link id="events-page" as={NavLink} to="/events" key="events">Events</Nav.Link>,
              <Nav.Link id="profiles-page" as={NavLink} to="/profiles" key="profiles">Profiles</Nav.Link>,
              <Nav.Link id="myevents-page" as={NavLink} to="/my-events" key="my-events">My Events</Nav.Link>,
              <Nav.Link id="my-profile" as={NavLink} to="/my-profile" key="my-profile">My Profile</Nav.Link>,
            ]) : ''}
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? ([
              <Nav.Link id="admin-events-page" as={NavLink} to="/admin-events" key="admin-events">Events</Nav.Link>,
              <Nav.Link id="admin-profiles-page" as={NavLink} to="/admin-profiles" key="admin-profiles">Profiles</Nav.Link>,
            ]) : ''}
          </Nav>
          <Nav className="justify-content-end">
            {currentUser === '' ? ([
              <Nav.Link id="login" as={NavLink} to="/signin" key="signin">Sign In</Nav.Link>,
              <Nav.Link id="signup" as={NavLink} to="/signup" key="signup">Sign Up</Nav.Link>,
            ]) : (
              <NavDropdown id="navbar-current-user" title={currentUser}>
                <NavDropdown.Item id="navbar-sign-out" as={NavLink} to="/signout">
                  <BoxArrowRight />
                  {' '}
                  Sign
                  out
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;

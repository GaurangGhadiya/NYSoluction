import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../actions";

const Header = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(signOut());
  };

  const renderLoggedinLinks = () => {
    return (
      <Nav>
        <li className="nav-item">
          <span className="nav-link" onClick={logout}>
            Signout
          </span>
        </li>
      </Nav>
    );
  };

  const renderNonLoggedinLinks = () => {
    return (
      <Nav>
        <li className="nav-item">
          <NavLink to="signin" className="nav-link">
            Signin
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="signup" className="nav-link">
            Signup
          </NavLink>
        </li>
      </Nav>
    );
  };
  return (
    <>
      <Navbar
        collapseOnSelect
        style={{ zIndex: 1 }}
        expand="lg"
        bg="dark"
        variant="dark"
      >
        <Container fluid>
          {/* <button onClick={toggleBtn}>=</button> */}
          <Link className="navbar-brand" to="/">
            Student Registration
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            {auth.authenticate
              ? renderLoggedinLinks()
              : renderNonLoggedinLinks()}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;

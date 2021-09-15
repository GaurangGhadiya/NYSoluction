import React, { useState } from "react";
import { Navbar, Nav, Row, Col, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Header from "../Header";

const Layout = (props) => {
  return (
    <>
      <Header />

      {props.children}
    </>
  );
};

export default Layout;

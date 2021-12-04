import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <Navbar className="navbar">
      <Container className="container">
        <Link to="/">
          <Navbar.Brand>Tech Blog</Navbar.Brand>
        </Link>

        <Nav className="links">
          <button type="button" class="btn btn-link btn-sm">
            BookMarks
          </button>
          <Link to="/signin" class="btn btn-link btn-sm">
            Sign In
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;

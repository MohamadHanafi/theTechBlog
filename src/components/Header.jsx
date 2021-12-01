import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import "./Header.css";

const Header = () => {
  return (
    <Navbar className="navbar">
      <Container className="container">
        <Navbar.Brand href="#home">Tech Blog</Navbar.Brand>
        <Nav className="links">
          <button type="button" class="btn btn-link btn-sm">
            BookMarks
          </button>
          <button type="button" class="btn btn-link btn-sm">
            Sign In
          </button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;

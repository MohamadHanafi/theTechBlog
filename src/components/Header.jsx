import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { USER_CREATE_RESET, USER_LOGOUT } from "../constants/userConstants";

import "./Header.css";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userLogin);

  const logoutHandler = () => {
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: USER_CREATE_RESET });
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const renderUserInfoDropDown = () => {
    return (
      <NavDropdown title={userInfo.name} className="btn btn-link btn-sm ">
        <LinkContainer to="/profile">
          <NavDropdown.Item>Profile</NavDropdown.Item>
        </LinkContainer>
        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
      </NavDropdown>
    );
  };

  const renderLoginLink = () => {
    return (
      <LinkContainer to="/login" className="btn btn-link btn-sm">
        <button type="button" className="btn btn-link btn-sm ">
          Sign In
        </button>
      </LinkContainer>
    );
  };

  const renderAdminDropDown = () => {
    return (
      <NavDropdown
        title="Admin"
        id="adminMenu"
        className="btn btn-link btn-sm "
      >
        <LinkContainer to="/admin/users">
          <NavDropdown.Item>Users</NavDropdown.Item>
        </LinkContainer>
      </NavDropdown>
    );
  };

  return (
    <Navbar className="navbar">
      <Container className="container">
        <LinkContainer to="/">
          <Navbar.Brand>Tech Blog</Navbar.Brand>
        </LinkContainer>

        <Nav className="links">
          <button type="button" className="btn btn-link btn-sm ">
            BookMarks
          </button>
          {userInfo ? renderUserInfoDropDown() : renderLoginLink()}
          {userInfo && userInfo.role === "admin" && renderAdminDropDown()}
          {userInfo && ["admin", "publisher"].includes(userInfo.role) && (
            <LinkContainer to="/blogs/new">
              <button type="button" className="btn btn-link btn-sm ">
                New{" "}
              </button>
            </LinkContainer>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;

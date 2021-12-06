import Button from "@restart/ui/esm/Button";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";

import Message from "../components/Message";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { userUpdate } from "../actions/userActions";

import "./ProfileScreen.css";

const ProfileScreen = () => {
  // initialize
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userLogin);
  // state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const {
    loading,
    success,
    error: userUpdateError,
    userInfo: userUpdateInfo,
  } = useSelector((state) => state.userUpdate);

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    } else {
      navigate("/login");
    }

    if (userUpdateError) {
      setError(userUpdateError);
    }

    if (success) {
      setError("");
    }
  }, [userInfo, userUpdateError]);

  const submitHandler = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("passwords are not matching");
      return;
    }
    const user = {
      email: email,
      name: name ? name : userInfo.name,
      password: password ? password : userInfo.password,
    };
    dispatch(userUpdate(user));
    setError("");
  };

  return (
    <Container>
      <Row>
        <Col sm={12} md={3}>
          <h1 className="mt-2">Profile Screen</h1>
          {error && <Message variant="danger">{error}</Message>}
          {success && <Message variant="success">success</Message>}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="email" className="my-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Email"
                name="Email"
                value={email}
                disabled
              />
            </Form.Group>
            <Form.Group controlId="password" className="my-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="confirmPassword" className="my-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="btn btn-primary btn-update my-3"
            >
              {loading ? "Loading..." : "Update"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileScreen;

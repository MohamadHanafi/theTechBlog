import React, { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { userCreate } from "../actions/userActions";

import FormContainer from "../components/FormContainer";
import Message from "../components/Message";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    dispatch(userCreate({ name, email, password }));
  };

  const { loading, error, userInfo, success } = useSelector(
    (state) => state.userCreate
  );

  useEffect(() => {
    if (success) {
      setMessage("Registration successful");
      navigate("/");
    } else if (error) {
      setMessage(error);
    }
  }, [success, error]);

  return (
    <Container>
      <FormContainer>
        <h1 className="mt-3">Register</h1>
        {message && <Message variant="info">{message}</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="py-1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="email" className="py-1">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              name="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password" className="py-1">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              name="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword" className="py-1">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Button
            type="submit"
            style={{ width: "100%" }}
            variant="primary"
            className="my-3"
          >
            {loading ? "Loading..." : "Register"}
          </Button>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default RegisterScreen;

import React, { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";

import { useNavigate, Link } from "react-router-dom";

import { Form, Button, Row, Col } from "react-bootstrap";

import { userLogin } from "../actions/userActions";

import { useSelector, useDispatch } from "react-redux";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  let navigate = useNavigate();

  const { loading, userInfo, error } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  });

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userLogin(email, password));
    if (userInfo) {
      navigate("/");
    }
  };

  return (
    <FormContainer>
      <h1 className="mt-3">Sign In</h1>
      <Form onSubmit={submitHandler} className="d-grid gap-3">
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
        {error && (
          <Message variant="danger" class="mt-2">
            {error}
          </Message>
        )}
        <Button variant="primary" type="submit">
          {loading ? "Loading..." : "Sign In"}
        </Button>
        <Row className="py-3">
          <Col>
            New User? <Link to={"/register"}>Register</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default SignInScreen;

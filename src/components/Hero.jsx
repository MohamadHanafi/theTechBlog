import React, { useEffect } from "react";
import "./Hero.css";
import { Container, Image, Row, Col } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../actions/blogsActions";
import Loader from "./Loader";
import Message from "./Message";

import { createMarkup } from "../assets/createMarkup";

const Hero = () => {
  const dispatch = useDispatch();

  const blogsList = useSelector((state) => state.blogs);
  const { blogs, loading, error } = blogsList;

  useEffect(() => {
    dispatch(getBlogs());
  }, []);

  return loading ? (
    <Loader />
  ) : blogs ? (
    <Container className="featured">
      <Row>
        <Col sm="12" md="8">
          <Image src={blogs[0].photo} fluid rounded className="thumbnail" />
        </Col>
        <Col sm="12" md="4">
          <div className="blog-content">
            <p>{blogs[0].createdAt.substring(0, 10)}</p>
            <h1>{blogs[0].title}</h1>
            <p>{blogs[0].description.substring(0, 100)}</p>
          </div>
        </Col>
      </Row>
    </Container>
  ) : error ? (
    <Message variant="dark" />
  ) : null;
};

export default Hero;

import React from "react";
import "./Hero.css";
import { Container, Image, Row, Col } from "react-bootstrap";
import { featuredBlog } from "../featuredBlog";

const Hero = () => {
  let text = featuredBlog.body.substring(0, 100);
  return (
    <Container className="featured">
      <Row>
        <Col sm="12" md="8">
          <Image src={featuredBlog.photo} fluid rounded className="thumbnail" />
        </Col>
        <Col sm="12" md="4">
          <div className="blog-content">
            <p>{featuredBlog.createdAt}</p>
            <h1>{featuredBlog.title}</h1>
            <p>{text} ...</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Hero;

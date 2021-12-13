import React from "react";
import "./Hero.css";
import { Container, Image, Row, Col } from "react-bootstrap";

const Hero = (props) => {
  return (
    <Container className="featured">
      <Row>
        <Col sm="12" md="8">
          <Image src={props.image} fluid rounded className="thumbnail" />
        </Col>
        <Col sm="12" md="4">
          <div className="blog-content">
            <p>{props.createdAt.substring(0, 10)}</p>
            <h1>{props.title}</h1>
            <p>{props.description.substring(0, 100)}</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Hero;

import React from "react";
import { Image } from "react-bootstrap";

const Blog = (props) => {
  return (
    <div className="blog">
      <Image src={props.image} fluid rounded className="card-photo" />
      <p>{props.createdAt}</p>
      <h1>{props.title}</h1>
      <p>{props.description.substring(0, 100)}</p>
    </div>
  );
};

export default Blog;

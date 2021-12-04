import React from "react";
import { Image } from "react-bootstrap";

import { createMarkup } from "../assets/createMarkup";

const Blog = (props) => {
  let markup = createMarkup(props.body.substring(0, 200));

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

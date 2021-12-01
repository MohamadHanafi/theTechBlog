import React from "react";
import { Container } from "react-bootstrap";
import Blog from "./Blog";
import { Blogs as blogsArray } from "../Blogs";
import "./Blogs.css";

const Blogs = () => {
  return (
    <Container className="blogs">
      {blogsArray.map((blog) => {
        return (
          <Blog
            key={blog._id}
            image={blog.photo}
            title={blog.title}
            body={blog.body}
            createdAt={blog.createdAt}
          />
        );
      })}
    </Container>
  );
};

export default Blogs;

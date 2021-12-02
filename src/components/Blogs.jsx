import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../actions/blogsActions";

import { Container } from "react-bootstrap";
import Blog from "./Blog";

import "./Blogs.css";

import Loader from "./Loader";
import Message from "./Message";

const Blogs = () => {
  const dispatch = useDispatch();

  const blogsArray = useSelector((state) => state.blogs);
  const { blogs, loading, error } = blogsArray;

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : blogs ? (
    <Container className="blogs">
      {blogs.map((blog) => {
        return (
          <Blog
            key={blog._id}
            image={blog.photo}
            title={blog.title}
            body={blog.body}
            createdAt={blog.createdAt.substring(0, 10)}
          />
        );
      })}
    </Container>
  ) : error ? (
    <Message variant="dark">{error}</Message>
  ) : (
    <></>
  );
};

export default Blogs;

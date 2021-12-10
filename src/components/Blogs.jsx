import React, { useEffect } from "react";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../actions/blogsActions";

import { Container } from "react-bootstrap";
import Blog from "./Blog";

import "./Blogs.css";

import Loader from "./Loader";
import Message from "./Message";
import { GET_BLOG_RESET } from "../constants/blogsConstants";

const Blogs = () => {
  const dispatch = useDispatch();

  const { blogs, loading, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch({ type: GET_BLOG_RESET });
    dispatch(getBlogs());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : blogs ? (
    <Container className="blogs">
      {blogs.map((blog) => {
        return (
          <Link to={`/blogs/${blog.slug}`} key={blog._id}>
            <Blog
              image={blog.image}
              title={blog.title}
              description={blog.description}
              body={blog.body}
              createdAt={blog.createdAt.substring(0, 10)}
            />
          </Link>
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

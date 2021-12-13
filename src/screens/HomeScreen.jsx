import React, { useEffect } from "react";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../actions/blogsActions";

import { Container } from "react-bootstrap";
import Blog from "../components/Blog";
import Hero from "../components/Hero";

import "./HomeScreen.css";

import Loader from "../components/Loader";
import Message from "../components/Message";
import { GET_BLOG_RESET } from "../constants/blogsConstants";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const { blogs, loading, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch({ type: GET_BLOG_RESET });
    dispatch(getBlogs());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : blogs ? (
    <>
      <div className="featured">
        <Link to={`/blogs/${blogs[0].slug}`}>
          <Hero
            image={blogs[0].image}
            title={blogs[0].title}
            description={blogs[0].description}
            createdAt={blogs[0].createdAt.substring(0, 10)}
          />
        </Link>
      </div>

      <Container className="blogs">
        {blogs.map((blog) => {
          //skip the first blog
          if (blog.slug === blogs[0].slug) {
            return null;
          }

          return (
            <Link to={`/blogs/${blog.slug}`} key={blog._id}>
              <Blog
                image={blog.image}
                title={blog.title}
                description={blog.description}
                createdAt={blog.createdAt.substring(0, 10)}
              />
            </Link>
          );
        })}
      </Container>
    </>
  ) : error ? (
    <Message variant="dark">{error}</Message>
  ) : (
    <></>
  );
};

export default HomeScreen;

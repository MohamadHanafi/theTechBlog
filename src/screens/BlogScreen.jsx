import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  getBlog,
  bookmarkBlog,
  getBookmarkedBlogs,
} from "../actions/blogsActions";

import "./BlogScreen.css";
import Loader from "../components/Loader";
import Message from "../components/Message";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faHeart } from "@fortawesome/free-solid-svg-icons";

const BlogScreen = () => {
  const [isBooked, setIsBooked] = useState(false);
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { loading, error, blog } = useSelector((state) => state.blog);

  const { userInfo } = useSelector((state) => state.userLogin);

  const { blogs: bookmarks } = useSelector((state) => state.markedBlogs);

  useEffect(() => {
    if (!blog) {
      dispatch(getBlog(slug));
    }

    if (!bookmarks) {
      dispatch(getBookmarkedBlogs());
    }

    if (
      bookmarks &&
      blog &&
      bookmarks.map((blog) => blog._id).includes(blog._id)
    ) {
      setIsBooked(true);
    } else {
      setIsBooked(false);
    }
  }, [blog, bookmarks, dispatch, slug]);

  function createMarkup(html) {
    return { __html: html };
  }

  const handleBookmark = (blogId, userId) => {
    dispatch(bookmarkBlog(blogId, userId));
  };

  const handleRemoveBookmark = (blogId, userId) => {
    console.log("todo: remove bookmark");
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : blog && blog.user ? (
    <Container className="d-flex justify-content-start flex-column align-items-center blog-screen">
      <h1 className="text-center">{blog.title}</h1>
      <div className="d-flex flex-column justify-content-start align-items-center writer-date">
        <h2 className="text-primary">{blog.user.name}</h2>
        <span className=".text-muted">{blog.createdAt.substring(0, 10)}</span>
      </div>
      <div
        className="blog-container mt-5 text-center"
        dangerouslySetInnerHTML={createMarkup(blog.body)}
      />
      {userInfo && !isBooked ? (
        <Button
          variant="primary"
          className="mt-5 rounded-circle bookmark-btn"
          onClick={() => handleBookmark(blog._id, userInfo._id)}
        >
          <FontAwesomeIcon icon={faHeart} size="sm" />
        </Button>
      ) : (
        <Button
          variant="primary"
          className="mt-5 rounded-circle bookmark-btn"
          onClick={() => handleRemoveBookmark(blog._id, userInfo._id)}
        >
          <FontAwesomeIcon icon={faBookmark} size="sm" />
        </Button>
      )}
    </Container>
  ) : (
    <></>
  );
};

export default BlogScreen;

import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  getBlog,
  bookmarkBlog,
  getBookmarkedBlogs,
  removeBookmark,
  deleteBlog,
} from "../actions/blogsActions";

import "./BlogScreen.css";
import Loader from "../components/Loader";
import Message from "../components/Message";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faHeart } from "@fortawesome/free-solid-svg-icons";
import { BLOG_BOOKMARK_RESET } from "../constants/blogsConstants";

const BlogScreen = () => {
  const [isBooked, setIsBooked] = useState(false);

  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, blog } = useSelector((state) => state.blog);

  const { userInfo } = useSelector((state) => state.userLogin);

  const { blogs: bookmarks } = useSelector((state) => state.markedBlogs);

  const { success: bookmarkedSuccess } = useSelector(
    (state) => state.blogMarked
  );

  useEffect(() => {
    if (!blog) {
      dispatch(getBlog(slug));
    }

    if (!bookmarks) {
      dispatch(getBookmarkedBlogs());
    }

    if (bookmarkedSuccess) {
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

    return () => {
      dispatch({ type: BLOG_BOOKMARK_RESET });
    };
  }, [blog, bookmarks, dispatch, slug, bookmarkedSuccess]);

  function createMarkup(html) {
    return { __html: html };
  }

  const handleBookmark = (blogId, userId) => {
    dispatch(bookmarkBlog(blogId, userId));
  };

  const handleRemoveBookmark = (blogId, userId) => {
    dispatch(removeBookmark(blogId, userId));
  };

  const redirectToLogin = () => {
    navigate(`/login?redirect=/blogs/${slug}`);
  };

  const renderButton = (icon, callback) => {
    return (
      <Button
        variant="primary"
        className="mt-5 rounded-circle bookmark-btn"
        onClick={() => callback(blog._id, userInfo ? userInfo._id : "")}
      >
        <FontAwesomeIcon icon={icon} size="sm" />
      </Button>
    );
  };

  const handleBlogDelete = (slug) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      dispatch(deleteBlog(slug));
      navigate("/");
    }
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
      {userInfo
        ? !isBooked
          ? renderButton(faHeart, handleBookmark)
          : renderButton(faBookmark, handleRemoveBookmark)
        : renderButton(faHeart, redirectToLogin)}
      {userInfo &&
        (userInfo.role === "admin" || userInfo._id === blog.user._id) && (
          <div className="edit-btn">
            <Button
              variant="dark"
              className="mx-1"
              onClick={() => navigate(`/blogs/${slug}/edit`)}
            >
              Edit Blog
            </Button>
            <Button
              variant="outline-danger"
              onClick={() => handleBlogDelete(slug)}
            >
              Delete
            </Button>
          </div>
        )}
    </Container>
  ) : (
    <></>
  );
};

export default BlogScreen;

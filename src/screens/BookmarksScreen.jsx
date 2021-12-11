import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { getBookmarkedBlogs } from "../actions/blogsActions";
import Blog from "../components/Blog";

import Loader from "../components/Loader";
import Message from "../components/Message";

import "./bookmarksScreen.css";

const BookmarksScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.userLogin);

  const { loading, error, blogs } = useSelector((state) => state.markedBlogs);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login?redirect=bookmarks");
    }

    if (!blogs) {
      dispatch(getBookmarkedBlogs());
    }
  }, [blogs, dispatch, userInfo, navigate]);

  return (
    <Container className="bookmarks">
      <h1 className="mt-3">BookMarks</h1>
      <div className="blogs">
        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
        {!loading &&
          !error &&
          blogs &&
          blogs.map((blog) => (
            <Link to={`/blogs/${blog.slug}`} key={blog._id}>
              <Blog
                image={blog.image}
                title={blog.title}
                description={blog.description}
                body={blog.body}
                createdAt={blog.createdAt.substring(0, 10)}
              />
            </Link>
          ))}
      </div>
    </Container>
  );
};

export default BookmarksScreen;

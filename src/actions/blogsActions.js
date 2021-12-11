import {
  GET_BLOGS_REQUEST,
  GET_BLOGS_SUCCESS,
  GET_BLOGS_FAILED,
  BLOG_CREATE_REQUEST,
  BLOG_CREATE_SUCCESS,
  BLOG_CREATE_FAILED,
  GET_BLOG_REQUEST,
  GET_BLOG_SUCCESS,
  GET_BLOG_FAILED,
  BLOG_BOOKMARK_REQUEST,
  BLOG_BOOKMARK_SUCCESS,
  BLOG_BOOKMARK_FAILED,
  BLOG_GET_BOOKMARKS_REQUEST,
  BLOG_GET_BOOKMARKS_SUCCESS,
  BLOG_GET_BOOKMARKS_FAILED,
  BLOG_REMOVE_BOOKMARK_REQUEST,
  BLOG_REMOVE_BOOKMARK_SUCCESS,
  BLOG_REMOVE_BOOKMARK_FAILED,
} from "../constants/blogsConstants";
import axios from "axios";

export const getBlogs = () => async (dispatch) => {
  try {
    dispatch({ type: GET_BLOGS_REQUEST });

    const { data } = await axios.get(`/api/blogs`);

    dispatch({
      type: GET_BLOGS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_BLOGS_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getBlog = (slug) => async (dispatch) => {
  try {
    dispatch({ type: GET_BLOG_REQUEST });
    const { data } = await axios.get(`/api/blogs/${slug}`);
    dispatch({
      type: GET_BLOG_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_BLOG_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createBlog = (blog) => async (dispatch, getState) => {
  try {
    dispatch({ type: BLOG_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post("/api/blogs", blog, config);

    dispatch({
      type: BLOG_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BLOG_CREATE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const bookmarkBlog = (blogId, userId) => async (dispatch, getState) => {
  try {
    dispatch({ type: BLOG_BOOKMARK_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/users/${userId}/${blogId}`,
      {},
      config
    );

    dispatch({
      type: BLOG_BOOKMARK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BLOG_BOOKMARK_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeBookmark =
  (blogId, userId) => async (dispatch, getState) => {
    try {
      dispatch({ type: BLOG_REMOVE_BOOKMARK_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.delete(
        `/api/users/${userId}/${blogId}`,
        config
      );
      dispatch({
        type: BLOG_REMOVE_BOOKMARK_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: BLOG_REMOVE_BOOKMARK_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getBookmarkedBlogs = () => async (dispatch, getState) => {
  try {
    dispatch({ type: BLOG_GET_BOOKMARKS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/bookmarks`, config);

    dispatch({ type: BLOG_GET_BOOKMARKS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: BLOG_GET_BOOKMARKS_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

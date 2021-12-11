import {
  GET_BLOGS_REQUEST,
  GET_BLOGS_SUCCESS,
  GET_BLOGS_FAILED,
  BLOG_CREATE_REQUEST,
  BLOG_CREATE_SUCCESS,
  BLOG_CREATE_FAILED,
  BLOG_CREATE_RESET,
  GET_BLOG_REQUEST,
  GET_BLOG_SUCCESS,
  GET_BLOG_FAILED,
  GET_BLOG_RESET,
  BLOG_BOOKMARK_REQUEST,
  BLOG_BOOKMARK_SUCCESS,
  BLOG_BOOKMARK_FAILED,
  BLOG_GET_BOOKMARKS_REQUEST,
  BLOG_GET_BOOKMARKS_SUCCESS,
  BLOG_GET_BOOKMARKS_FAILED,
  BLOG_REMOVE_BOOKMARK_REQUEST,
  BLOG_REMOVE_BOOKMARK_SUCCESS,
  BLOG_REMOVE_BOOKMARK_FAILED,
  BLOG_GET_BOOKMARKS_RESET,
  BLOG_BOOKMARK_RESET,
} from "../constants/blogsConstants";

export const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_BLOGS_REQUEST:
      return { loading: true, blogs: [] };
    case GET_BLOGS_SUCCESS:
      return { loading: false, blogs: action.payload };
    case GET_BLOGS_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const blogReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_BLOG_REQUEST:
      return { loading: true };
    case GET_BLOG_SUCCESS:
      return { loading: false, success: true, blog: action.payload };
    case GET_BLOG_FAILED:
      return { loading: false, error: action.payload };
    case GET_BLOG_RESET:
      return {};
    default:
      return state;
  }
};

export const blogCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BLOG_CREATE_REQUEST:
      return { loading: true };
    case BLOG_CREATE_SUCCESS:
      return { loading: false, blog: action.payload, success: true };
    case BLOG_CREATE_FAILED:
      return { loading: false, error: action.payload };
    case BLOG_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const blogMarkedReducer = (state = {}, action) => {
  switch (action.type) {
    case BLOG_BOOKMARK_REQUEST:
      return { loading: true };
    case BLOG_BOOKMARK_SUCCESS:
      return { loading: false, success: true };
    case BLOG_BOOKMARK_FAILED:
      return { loading: false, error: action.payload };

    case BLOG_REMOVE_BOOKMARK_REQUEST:
      return { loading: true };
    case BLOG_REMOVE_BOOKMARK_SUCCESS:
      return { loading: false, success: true };
    case BLOG_REMOVE_BOOKMARK_FAILED:
      return { loading: false, error: action.payload };

    case BLOG_BOOKMARK_RESET:
      return {};

    default:
      return state;
  }
};

export const markedBlogsReducer = (state = [], action) => {
  switch (action.type) {
    case BLOG_GET_BOOKMARKS_REQUEST:
      return { loading: true };
    case BLOG_GET_BOOKMARKS_SUCCESS:
      return { loading: false, blogs: action.payload };
    case BLOG_GET_BOOKMARKS_FAILED:
      return { loading: false, error: action.payload };
    case BLOG_GET_BOOKMARKS_RESET:
      return [];
    default:
      return state;
  }
};

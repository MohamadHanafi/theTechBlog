import {
  GET_BLOGS_REQUEST,
  GET_BLOGS_SUCCESS,
  GET_BLOGS_FAILED,
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

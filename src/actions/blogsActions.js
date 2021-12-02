import {
  GET_BLOGS_REQUEST,
  GET_BLOGS_SUCCESS,
  GET_BLOGS_FAILED,
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

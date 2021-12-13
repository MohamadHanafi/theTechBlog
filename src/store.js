import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  blogCreateReducer,
  blogEditReducer,
  blogDeleteReducer,
  blogMarkedReducer,
  blogReducer,
  blogsReducer,
  markedBlogsReducer,
} from "./reducers/blogsReducers";
import {
  userLoginReducer,
  userUpdateReducer,
  userCreateReducer,
  userListReducer,
  userDeleteReducer,
} from "./reducers/userReducer";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  blogs: blogsReducer,
  blog: blogReducer,
  blogCreate: blogCreateReducer,
  blogEdit: blogEditReducer,
  blogDelete: blogDeleteReducer,
  blogMarked: blogMarkedReducer,
  markedBlogs: markedBlogsReducer,
  userUpdate: userUpdateReducer,
  userCreate: userCreateReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
});

const middleware = [thunk];

const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromLocalStorage },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

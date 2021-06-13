import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import postReducer from "../state/post/post";
import userReducer from "../state/user/user";
import commentReducer from "../state/comment/comment";

function getStore(preloadedState){
  return createStore(combineReducers({
    users: userReducer,
    posts: postReducer,
    comments: commentReducer
  }), preloadedState, applyMiddleware(thunk));
}

export default getStore;
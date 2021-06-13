import { getPosts } from "../../services/rest/client";
import { getData } from "../helpers/data";

export const REQUEST_POSTS = 'post/REQUEST_POSTS';
export const RECEIVE_POSTS = "post/RECEIVE_POSTS";

const defaultState = {
  isFetching: false,
  data: []
}

const requestPosts = id => ({
  type: REQUEST_POSTS,
  payload: id
})

const receivePosts = ({data}) => ({
  type: RECEIVE_POSTS,
  payload: data
})


export const fetchPosts = (id) => async (dispatch) => {
  dispatch(requestPosts(id))
  const {data, status} = await getPosts({userId: id});
  if (!data || status >= 400) return;
  dispatch(receivePosts({
    data
  }));
};

export default function postReducer(state = defaultState, action){
  switch (action.type) {
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_POSTS:
      return {
        ...state,
        data: action.payload,
        isFetching: false,
      };
    default:
      return state;
  }
}
import { getPosts } from "../../services/rest/server";
import { RECEIVE_POSTS } from "./post";

export const fetchPosts = (userId) => async (dispatch) => {
  const {data, status} = await getPosts({id: userId});
  if (!data || status >= 400) return;
  dispatch({
    type: RECEIVE_POSTS,
    payload: data,
  });
};
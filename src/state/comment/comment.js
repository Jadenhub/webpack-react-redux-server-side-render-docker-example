import { getPostComments } from "../../services/rest/client";
import { v4 } from 'uuid';


export const REQUEST_COMMENTS = 'comment/REQUEST_COMMENTS';
export const RECEIVE_COMMENTS = "comment/RECEIVE_COMMENTS";
export const ADD_COMMENT = "comment/ADD_COMMENT";

const defaultState = {
  isFetching: false,
  data: {}
}

const requestComments = postId => ({
  type: REQUEST_COMMENTS,
  payload: postId
})

const receiveComments = ({data}) => ({
  type: RECEIVE_COMMENTS,
  payload: data
})


function add({postId, comment, state}){
  const { data } = state;
  if (data[postId]){
    return data[postId].slice().concat([{
      body: comment,
      postId,
      id: v4()
    }])
  } else {
    return [comment]
  }
}

export const addComment = (data)=> ({
  type: ADD_COMMENT,
  payload: data
})

export const fetchComments = (postId) => async (dispatch) => {
  dispatch(requestComments(postId))
  const {data, status} = await getPostComments({postId});
  if (!data || status >= 400) return;
  dispatch(receiveComments({
    data: {
      [postId]: data
    }
  }));
};

export default function commentReducer(state = defaultState, action){
  switch (action.type) {
    case REQUEST_COMMENTS:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_COMMENTS:
      return {
        ...state,
        data: {
          ...action.payload
        },
        isFetching: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.postId]: add({
            postId: action.payload.postId,
            comment: action.payload.comment,
            state
          })
        }
      }
    default:
      return state;
  }
}
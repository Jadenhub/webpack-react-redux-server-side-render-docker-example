import { getUsers } from "../../services/rest/client";
import { getData } from "../helpers/data";

export const REQUEST_USERS = 'user/REQUEST_USERS';
export const RECEIVE_USERS = "user/RECEIVE_USERS";
export const RECEIVCE_HOMEDATA = 'user/RECEIVE_HOMEDATA';

const defaultState = {
  isFetching: false,
  data: {}
}

const requestUser = id => ({
  type: REQUEST_USERS,
  payload: id
})

const receivePosts = ({data}) => ({
  type: RECEIVE_USERS,
  payload: data
})


export const fetchUsers = (id) => async (dispatch) => {
  dispatch(requestUser(id))
  const {data, status} = await getUsers({id});
  if (!data || status >= 400) return;
  dispatch(receivePosts({
    data
  }));
};

export default function userReducer(state = defaultState, action){
  switch (action.type) {
    case REQUEST_USERS:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_USERS:
      return {
        ...state,
        isFetching: false,
        data: {
          ...state.data,
          ...getData(action.payload)
        }
      };
    default:
      return state;
  }
}
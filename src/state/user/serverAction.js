import { getUsers } from "../../services/rest/server";
import { RECEIVE_USERS } from "./user";

export const fetchUsers = (id) => async (dispatch) => {
  const {data, status} = await getUsers({id});
  if (!data || status >= 400) return;
  dispatch({
    type: RECEIVE_USERS,
    payload: data,
  });
};
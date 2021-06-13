import { API_PATH } from "../../constants/env";
import globalfectch from "../../helpers/globalfetch";
import queryString from 'query-string';


export async function getPosts(parms) {
  const { userId } = parms || {}
  const qs = queryString.stringify({ userId }, {
    skipNull: true
  })
  try {
    const res = await globalfectch(
      `${API_PATH}/posts?${qs}`,
      {
        headers: {
          "Content-Type": "application/json"
        },
        method: 'GET',
        useAbsUrl: true,
      }
    )
    return res
  } catch(error) {
    throw error
  }
}

export async function getUsers(parms){
  const { id } = parms || {}
  try {
    const res = await globalfectch(
      `${API_PATH}/users${id? '/' + id : ''}`,
      {
        headers: { "Content-Type": "application/json" },
        method: 'GET',
        useAbsUrl: true,
      }
    )
    return res
  } catch(error) {
    throw error
  }
}
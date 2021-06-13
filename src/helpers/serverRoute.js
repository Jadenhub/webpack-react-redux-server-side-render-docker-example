import { match } from 'path-to-regexp';
import routes from "../client/Routes";
import { fetchPosts } from '../state/post/serverAction';
import { fetchUsers } from '../state/user/serverAction'

let cache;
const HOME_PATH = '/'
const USER_PATH = '/users/:id'
const parseUserPath = match(USER_PATH, { decode: decodeURIComponent });

const initialDataMap = {
  [HOME_PATH]: (store) => {
    return Promise.all([
      store.dispatch(fetchUsers()),
      store.dispatch(fetchPosts())
    ]);
  },
  [USER_PATH]: (store, req)=>{
    const { params } = parseUserPath(req.url) || {};
    return Promise.all([
      store.dispatch(fetchUsers(params.id)),
      store.dispatch(fetchPosts(params.id))
    ]);
  }
}

export function getServerRouter(){
  return cache ? cache : cache = routes.map((route)=>{
    if (initialDataMap[route.path]){
      route.getInitialData = initialDataMap[route.path]
    }
    return route;
  }) 
}
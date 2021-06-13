import Home from '../pages/index';
import User from '../pages/users';
import Custom404 from '../pages/404';

const routes = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/users/:id',
    component: User,
  },
  {
    path: '*',
    component: Custom404,
    exact: true
  }
]

export default routes
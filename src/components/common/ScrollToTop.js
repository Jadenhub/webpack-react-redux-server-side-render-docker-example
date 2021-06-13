import { useEffect } from 'react';
import {
  useLocation,
  withRouter
} from 'react-router-dom'

function ScrollToTop(props) {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return props.children
}

export default withRouter(ScrollToTop)
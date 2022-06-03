import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'; 
import styled from "styled-components"
import { withI18n } from '../components/decorator/i18n';
import PostList from '../components/post/PostList';
import { SIDE_WIDTH } from '../constants/style';
import { fetchPosts } from '../state/post/post';
import { fetchUsers } from '../state/user/user';
import svgA from '../../public/group.svg'

const HomeWrapper = styled.div`
  margin: 0 ${SIDE_WIDTH} 0 ${SIDE_WIDTH};
`
const PostListWrapper = styled.section`
  /* margin: 10px 24px 0 24px; */
`

console.log('svgA', svgA);
function Home(){
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchPosts());
    dispatch(fetchUsers())
  }, [])
  return (
    <HomeWrapper>
      <img src={svgA} />
      <PostListWrapper>
        <PostList />
      </PostListWrapper>
    </HomeWrapper>
  )
}

export default withI18n(Home)
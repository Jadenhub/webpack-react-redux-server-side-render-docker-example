import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; 
import { fetchUsers } from '../state/user/user';
import User from '../components/user/user';
import styled from 'styled-components';
import { SIDE_WIDTH } from '../constants/style';
import { fetchPosts } from '../state/post/post';
import PostList from '../components/post/PostList'

const Wrapper = styled.div`
  margin: 0 ${SIDE_WIDTH} 0 ${SIDE_WIDTH};
`
const UserWrapper = styled.section`
`
const PostListWrapper = styled.section`
  margin-top: 20px;
  /* margin: 10px 24px 0 24px; */
`

export default function Users({match}){
  const {params: {id: userId}} = match;
  const dispatch = useDispatch();
  const {users, posts} = useSelector(state => {
    return {
      users: state.users,
      posts: state.posts
    }
  })
  useEffect(()=>{
    dispatch(fetchUsers(userId));
    dispatch(fetchPosts(userId));
  }, [])

  return (
    <Wrapper>
      <Link to="/">To home page</Link>
      <UserWrapper>
        <User {...users.data[userId]}/>
      </UserWrapper>
      <PostListWrapper>
          <PostList />
        </PostListWrapper>
    </Wrapper>
  );
}
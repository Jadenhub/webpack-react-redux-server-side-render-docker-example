import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from "styled-components"
import InfiniteScroll from '../common/InfiniteScroll';
import Post from './Post';

const POST_COUNT = 10;

const UlWrapper = styled.ul`
  list-style: none;
  padding: 0;
`;
const LiWrapper = styled.li`
  margin-bottom:40px;
`;

function getPosts({users, posts}){
  return posts.map((post) => {
    return (
      <LiWrapper key={post.id} >
        <Post 
          post={post} 
          user={users[post.userId]? users[post.userId] : {}}
        />
      </LiWrapper>
    )
  })
};

export default function PostList({
}){
  const {posts, users} = useSelector(state => {
    return {
      posts: state.posts,
      users: state.users
    }
  })
  const [ scrollableNode, setScrollableNode] = useState(null);
  const [offset, setOffset] = useState(POST_COUNT);
  useEffect(()=>{
    setScrollableNode(window);
  }, [])
  return  (
    <section>
      <UlWrapper>
        <InfiniteScroll
          hasMore={posts.data.length > offset}
          loader={<div>...Loading</div>}
          next={()=>{
            setOffset(offset + POST_COUNT);
          }}
          scrollThreshold='80%'
          scrollableNode={scrollableNode}
        >
          {
            getPosts({
              posts: posts.data.slice(0, offset),
              users: users.data,
            })
          }
        </InfiniteScroll>
      </UlWrapper>
    </section>
  )
};
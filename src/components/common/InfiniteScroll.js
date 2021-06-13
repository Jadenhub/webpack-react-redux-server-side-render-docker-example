import useInfiniteScroll from '../hooks/useInfiniteScroll';
import React from 'react';

export default function InfiniteScroll({
  hasMore,
  next,
  scrollableNode,
  scrollThreshold,
  loader,
  ...props
}){
  const { children } = props;
  const {isFetching} =  useInfiniteScroll({
    hasMore,
    next,
    scrollThreshold,
    scrollableNode,
  });
  return (
    <> 
      { children }
      {isFetching? loader: null}
    </>
  );
}
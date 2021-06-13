import { useEffect, useState } from "react";
import { parseThreshold, ThresholdUnits } from "./helpers/parseThreshold"
import throttle from 'lodash.throttle';

function getHeight(target){
  if (target === window) {
    return {
      clientHeight: window.innerHeight,
      scrollHeight: document.documentElement.scrollHeight,
      scrollTop: document.documentElement.scrollTop,
    }
  } else {
    return {
      clientHeight: target.clientHeight,
      scrollHeight: target.scrollHeight,
      scrollTop: target.scrollTop,
    }
  }
}

function isElementAtBottom (
  target,
  scrollThreshold = 0.8
) {
  const {clientHeight, scrollHeight, scrollTop} = getHeight(target);
  const threshold = parseThreshold(scrollThreshold);
  if (threshold.unit === ThresholdUnits.Pixel) {
    return (
      scrollTop + clientHeight + threshold.value >= scrollHeight
    );
  }
  return (
    scrollTop + clientHeight >=
    (threshold.value / 100) * scrollHeight
  );
}

function runNext(next){
  return new Promise((resolve)=>{
    return resolve(next());
  })
}

export default function useInfiniteScroll({ 
  hasMore,
  next,
  scrollableNode,
  scrollThreshold,
 }) {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(()=>{
    if (!scrollableNode || !hasMore || typeof next !== 'function' || isFetching) return;
    function onScrollListener(){
      const atBottom =  isElementAtBottom(scrollableNode, scrollThreshold);

      if (atBottom && hasMore) {
        setIsFetching(true);
        runNext(next).catch((error)=>{console.log('[InfiniteScroll] run next error', error);}).finally(() => setIsFetching(false))
      }
    }
    const delayedOnScrollListener = throttle(onScrollListener, 150)

    scrollableNode.addEventListener('scroll', delayedOnScrollListener)
    return ()=> {
      scrollableNode.removeEventListener('scroll', delayedOnScrollListener)
    }
  }, [scrollableNode, hasMore, scrollThreshold, isFetching, next])

  return {
    isFetching
  }
}

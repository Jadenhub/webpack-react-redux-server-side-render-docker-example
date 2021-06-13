import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from "styled-components"
import { withI18n } from '../decorator/i18n';
import Button from "../interact/Button";
import { fetchComments } from '../../state/comment/comment';
import Commentlist from './Commentlist';
import { BUTTON_LOADING_BIG } from '../../constants/style';

const PostWrapper = styled.div`
  border: 1px solid rgb(151, 151, 151);
  box-shadow: 1px 1px 4px 1px rgba(114, 114, 114, 0.5);
  padding: 20px;
`;

const TextWrapper = styled.div`
 margin-top: 20px;
`

const ButtonWrapper = styled.div`
 margin-top: 20px;
`

const onClickHandler = async ({
  isFetching,
  dispatch,
  setReviewlistVisible,
  reviewlistVisible,
  postId,
  setIsFetching
}) => {
  if (isFetching) return;

  if (!reviewlistVisible){
    setIsFetching(true)
    await dispatch(fetchComments(postId))
    setIsFetching(false)
  }
  setReviewlistVisible(!reviewlistVisible);
}

function Post({
  user,
  post,
  i18n,
}){
  const dispatch = useDispatch();
  const { name } = user;
  const { title, body, userId, id} = post;
  const [ reviewlistVisible, setReviewlistVisible ] = useState(false);
  const {
    data:{
      [id]: comments,
    }
  } = useSelector(state => state.comments);
  const [isFetching, setIsFetching] = useState(false);
  return (
    <div>
      <PostWrapper>
        <TextWrapper>
          {i18n['AUTHOR']}: <Link to={`/users/${userId}`}>{name}</Link>
        </TextWrapper>
        <TextWrapper>{i18n['TITLE']}: {title}</TextWrapper>
        <TextWrapper>{i18n['CONTENT']}: {body}</TextWrapper>
        <ButtonWrapper>
          <Button
            loadingStyle={BUTTON_LOADING_BIG}
            isLoading={isFetching}
            onClick={() => onClickHandler({
              setReviewlistVisible,
              reviewlistVisible,
              dispatch,
              postId:id,
              isFetching,
              setIsFetching,
            })}
          >
            {i18n['COMMENTS']}
          </Button>
        </ButtonWrapper>
      </PostWrapper>
      {reviewlistVisible ? <Commentlist
        comments={comments}
        postId={id}
      /> : null}
    </div>
  )
}

export default withI18n(Post)
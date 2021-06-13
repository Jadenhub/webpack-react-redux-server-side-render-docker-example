import React, { useState } from 'react';
import styled from 'styled-components';
import { withI18n } from '../decorator/i18n';
import Comment from './comment';
import { BUTTON_SEND_COMMENT_BGCOLOR, BUTTON_LOADING_TINY } from '../../constants/style'
import Button from '../interact/Button';
import { addComment } from '../../state/comment/comment';
import { useDispatch } from 'react-redux';

const CommentsWrapper = styled.div`
  border: solid 1px #979797;
  padding: 20px 0 0 0;
`;

const UlWrapper = styled.ul`
  max-height: 300px;
  list-style: none;
  padding: 0 20px;
  width: 100%;
  box-sizing: border-box;
  overflow: auto;
`;

function getComment({comments, ...rest}){
  return comments.map((comment)=>{
    return <Comment key={comment.id} {...comment} {...rest}/>
  })
}

function getOnReplyFun({
  comment,
  setComment
}){
  return ({name})=>{
    setComment(comment + ` @${name} `)
  }
}

const ButtonWrapper = styled.div`
  text-align: right ;
`
const CommentText = styled.textarea`
  background-color: #ffffff;
  border-radius: 5px;
  box-sizing: border-box;
  margin-top: 20px;
  width: 100%;
  resize: none;
  height: 100px;
  padding: 10px;
`;

function onSubmitHandler(e, {
  comment,
  dispatch,
  postId,
  setComment,
}){
  dispatch(addComment({
    postId,
    comment
  }));
  setComment('');
}

function Commentlist({
  postId,
  i18n,
  comments = []
}){
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  return (
    <CommentsWrapper>
      <UlWrapper>
        <li>
          {getComment({
            comments,
            onReply: getOnReplyFun({
              comment,
              setComment
            })
          })}
        </li>
      </UlWrapper>
      <div>
        <form>
          <CommentText
            onChange={(event) => {
              setComment(event.target.value)
            }}
            value={comment}
          />
          <ButtonWrapper>
            <Button 
              bgColor={BUTTON_SEND_COMMENT_BGCOLOR}
              border='none'
              borderRadius='20px'
              isLoading={false}
              lineHeight={1.10}
              loadingStyle={BUTTON_LOADING_TINY}
              onClick={(e)=> onSubmitHandler(e, {
                dispatch,
                postId,
                comment,
                setComment,
              })}
              padding='5px 10px'
              type='button'
              >
                {i18n["SEND"]}
            </Button>
          </ButtonWrapper>
        </form>
      </div>
    </CommentsWrapper>
  )
}

export default withI18n(Commentlist);
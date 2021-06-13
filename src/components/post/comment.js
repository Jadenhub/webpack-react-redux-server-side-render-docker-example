import React from 'react';
import styled from 'styled-components';
import { withI18n } from '../decorator/i18n';
import Button from '../interact/Button';
import Text from '../text/Text';

const Separator = styled.hr`
  margin-top: 25px;
`;
const BUTTON_COLOR = '#3548d0de'

function Comment({
  i18n,
  body,
  email,
  name,
  onReply
}){
  return (
    <>
      <Text label={i18n['NAME']}>{name}</Text>
      <Text label={i18n['EMAIL']}>{email}</Text>
      <Text label={i18n['COMMENT']}>{body}</Text>
      <Button
       bgColor={BUTTON_COLOR}
       lineHeight={1.10}
        onClick={()=>{
          onReply({name: name? name: ''})
        }}
      >
        {i18n["REPLY"]}
      </Button>
      <Separator/>
    </>
  )
}

export default withI18n(Comment)
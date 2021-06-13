import React from 'react'
import styled from 'styled-components';

const LabelWrapper = styled.span`
  font-weight:bold;
`
const Wrapper = styled.div`
  margin: ${(props) => props.margin ? props.margin : '0 0 10px 0'};
`

export default function Text({
  label,
  children
}){
  return <Wrapper><LabelWrapper>{`${label}: `}</LabelWrapper>{children}</Wrapper>
}
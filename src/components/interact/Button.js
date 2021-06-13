import React from 'react'
import styled from 'styled-components'
import { BUTTON_DEFAULT_COLOR } from '../../constants/style'
import SvgThreeDots from '../icons/ThreeDots'

const ButtonWrapper = styled.button`
  position: relative;
  font-family: inherit;
  font-size: 100%;
  line-height: ${(props) => props.lineHeight ? props.lineHeight : 1.7};
  padding: ${(props) => props.padding ? props.padding : '0.3em 0.5em'};
  margin: 3px;
  color: ${(props) => `${props.color || '#fff'}`};
  border: ${(props) => props.border ? props.border : 'solid 1px #979797'};
  display: inline-block;
  background-color: ${(props) => `${props.bgColor || BUTTON_DEFAULT_COLOR}`};
  background-image: ${(props) => `${props.bgImage || 'none'}`};
  text-decoration: none;
  -webkit-appearance: none;
  border-radius: ${(props) => `${props.borderRadius || '10px'}`};
  overflow: hidden;
  cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointer'};
  transition: 0.2s;
  width: ${(props) => `${props.width || 'initial'}`};
  user-select: none;
`

const Button = ({
  isLoading,
  loadingStyle,
  ...props
}) => {
  return (
    <ButtonWrapper {...props}>
      { isLoading ? <SvgThreeDots {...loadingStyle} /> : props.children }
    </ButtonWrapper>
  )
}

export default Button;

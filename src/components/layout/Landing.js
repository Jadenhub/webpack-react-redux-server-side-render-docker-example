import React from 'react';
import styled from 'styled-components';
import { HEADER_HEIGHT } from '../../constants/style';

export const LandingWrapper = styled.div`
  margin: auto;
  width: 100%;
`;

const ContentWrapper = styled.main`
  margin-top: ${HEADER_HEIGHT}px;
`;

/**
 * Landing
 * RWD layout
 */
export default function Landing(props) {
  const { children } = props;
  return (
    <LandingWrapper>
      <ContentWrapper>
        {children}
      </ContentWrapper>
    </LandingWrapper>
  );
}

import React, { useEffect } from 'react';
import styled from 'styled-components';

const GlobalUIControlContainerBlock = styled.div``;
const GlobalUIControlContainer = ({ children, ...rest }) => {
  useEffect(() => {
    return () => {};
  });
  return (
    <GlobalUIControlContainerBlock>{children}</GlobalUIControlContainerBlock>
  );
};

export default GlobalUIControlContainer;

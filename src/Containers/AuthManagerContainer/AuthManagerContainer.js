import React, { useEffect } from 'react';
import styled from 'styled-components';

const AuthManagerContainerBlock = styled.div``;
const AuthManagerContainer = ({ children, ...rest }) => {
  return <AuthManagerContainerBlock>{children}</AuthManagerContainerBlock>;
};

export default AuthManagerContainer;

import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const RefererLink = ({ path, children, ...rest }) => {
  const location = useLocation();
  const pathname = { path };
  const state = { prevPath: location.pathname };
  return (
    <React.Fragment>
      <Link to={{ pathname, state }} {...rest}>
        {children}
      </Link>
    </React.Fragment>
  );
};

export default RefererLink;

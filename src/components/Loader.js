import React from 'react';
import styled from 'styled-components';

// Loader css
import '../css/loader.scss';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Loader = props => (
  <Container>
    <div className="loader" />
  </Container>
);

export default Loader;

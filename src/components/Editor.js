import React from 'react';
import styled from 'styled-components';

// Components
import Form from './Form';

const Container = styled.div`
  text-align: center;
  width: calc(100% - 400px);
`;

class Editor extends React.Component {
  render() {
    return (
      <Container>
        <Form />
      </Container>
    );
  }
}

export default Editor;

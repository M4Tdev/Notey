import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  width: calc(100% - 400px);
`;

class Editor extends React.Component {
  render() {
    return <Container>Editor</Container>;
  }
}

export default Editor;

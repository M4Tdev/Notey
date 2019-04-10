import React from 'react';
import styled from 'styled-components';

// Components
import Form from './Form';

const Container = styled.div`
  text-align: center;
  width: calc(100% - 40rem);
`;

class Editor extends React.Component {
  onSubmit = formValues => {
    console.log(formValues);
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.onSubmit} />
      </Container>
    );
  }
}

export default Editor;

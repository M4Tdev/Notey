import React from 'react';
import styled from 'styled-components';

const Container = styled.li`
  padding: 15px;

  &:nth-child(odd) {
    background-color: #f1f1f1;
  }
`;

const Note = props => <Container>{props.children}</Container>;

export default Note;

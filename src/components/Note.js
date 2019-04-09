import React from 'react';
import styled from 'styled-components';

const Container = styled.li`
  padding: 1.5rem;
  cursor: pointer;
  border-top: 0.1rem solid rgba(0, 0, 0, 0.3);
  border-bottom: 0.1rem solid rgba(0, 0, 0, 0.3);

  &:hover {
    background-color: rgba(66, 133, 244, 0.2);

    &:nth-child(odd) {
      background-color: rgba(66, 133, 244, 0.2);
    }
  }

  &:nth-child(odd) {
    background-color: #f1f1f1;
  }
`;

const Note = props => <Container>{props.children}</Container>;

export default Note;

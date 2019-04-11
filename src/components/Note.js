import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';

import history from '../history';

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

const Title = styled.h4`
  font-size: 1.6rem;
  font-weight: 500;
`;

const NoteContent = styled.p`
  font-size: 1.4rem;
  margin-left: 0.5rem;
  font-weight: 400;
`;

const Note = props => (
  <Container onClick={() => history.push(`/notes/${props.id}`)}>
    <Title>{props.noteTitle}</Title>
    <NoteContent>{_.truncate(props.noteContent, { length: 100 })}</NoteContent>
  </Container>
);

export default Note;

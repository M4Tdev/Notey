import React from 'react';
import styled from 'styled-components';
import { TrashAlt } from 'styled-icons/fa-regular';
import _ from 'lodash';
import { connect } from 'react-redux';

import history from '../history';

import { clearSelectedNote } from '../actions';

const Container = styled.li`
  position: relative;
  padding: 1.5rem;
  cursor: pointer;
  border-top: 0.1rem solid rgba(0, 0, 0, 0.3);
  border-bottom: 0.1rem solid rgba(0, 0, 0, 0.3);

  &:hover {
    background-color: rgba(66, 133, 244, 0.2);

    & > button {
      visibility: visible;
      opacity: 1;
    }

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

const DeleteButton = styled.button`
  visibility: hidden;
  opacity: 0;
  position: absolute;
  background: transparent;
  border: none;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  transition: visibility 0s, opacity 0.7s ease;
`;

const DeleteButtonIcon = styled(TrashAlt)`
  color: red;
  width: 1.8rem;
`;

const Note = props => {
  // Function runs delete note function from parent and passes to it event and note id
  const deleteNote = e => {
    props.deleteNote(e, props.id);
  };

  const loadNote = () => {
    props.clearSelectedNote();
    history.push(`/notes/${props.id}`);
  };

  return (
    <Container onClick={loadNote}>
      <DeleteButton onClick={deleteNote}>
        <DeleteButtonIcon />
      </DeleteButton>
      <Title>{props.noteTitle}</Title>
      <NoteContent>
        {_.truncate(props.noteContent, { length: 100 })}
      </NoteContent>
    </Container>
  );
};

export default connect(
  null,
  { clearSelectedNote }
)(Note);

import React, { useState } from 'react';
import styled from 'styled-components';
import { TrashAlt } from 'styled-icons/fa-regular';
import _ from 'lodash';
import { connect } from 'react-redux';

import history from '../history';

import { clearSelectedNote } from '../actions';

import '../css/spinningLoader.scss';

const Container = styled.li`
  position: relative;
  padding: 1.5rem;
  cursor: pointer;
  border-top: 0.1rem solid var(--color-border);
  border-bottom: 0.1rem solid var(--color-border);
  background-color: none;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--color-noteHover);

    & > button {
      visibility: visible;
      opacity: 1;
    }
  }
`;

const Title = styled.h4`
  font-size: 1.6rem;
  font-weight: 500;

  @media ${props => props.theme.mediaQueries.smallest} {
    font-size: 1.8rem;
  }

  @media ${props => props.theme.mediaQueries.small} {
    font-size: 1.7rem;
  }
`;

const NoteContent = styled.p`
  font-size: 1.4rem;
  margin-left: 0.5rem;
  font-weight: 400;

  @media ${props => props.theme.mediaQueries.smallest} {
    font-size: 1.6rem;
  }

  @media ${props => props.theme.mediaQueries.small} {
    font-size: 1.5rem;
  }
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

  @media ${props => props.theme.mediaQueries.smallest} {
    visibility: visible;
    opacity: 1;
  }

  @media ${props => props.theme.mediaQueries.small} {
    visibility: visible;
    opacity: 1;
  }
`;

const DeleteButtonIcon = styled(TrashAlt)`
  color: red;
  width: 1.8rem;
`;

const DeletingSpinner = styled.div`
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  width: 1.8rem;
  height: 1.8rem;
  margin: 0 auto;
`;

const Note = props => {
  const [isDeleting, setDeleting] = useState(false);
  // Function runs delete note function from parent and passes to it event and note id
  const deleteNote = e => {
    setDeleting(true);
    props.deleteNote(e, props.id);
  };

  const loadNote = () => {
    if (history.location.pathname !== `/notes/${props.id}`) {
      props.clearSelectedNote();
      history.push(`/notes/${props.id}`);
    }
  };

  const handleMobile = () => {
    loadNote();
    props.showMenu();
  };

  return (
    <Container onClick={props.isMobile ? handleMobile : loadNote}>
      {isDeleting ? (
        <DeletingSpinner className="spinning-loader" />
      ) : (
        <DeleteButton onClick={deleteNote}>
          <DeleteButtonIcon />
        </DeleteButton>
      )}
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

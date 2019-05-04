import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import _ from 'lodash';
import { Plus } from 'styled-icons/fa-solid';
import history from '../history';
import Loader from './Loader';

import {
  fetchNotes,
  deleteNote,
  clearSelectedNote,
  deleteNotes,
} from '../actions';

// Components
import Note from './Note';
import Modal from './Modal';

const Notes = styled.div`
  width: 40rem;
  height: 100%;
  border-right: 0.1rem solid rgba(0, 0, 0, 0.3);
`;

const Row = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 4.5rem 1rem;
  grid-template-areas: 'AddNoteButton Heading DeleteButton' '. Line .';
`;

const Heading = styled.h2`
  text-align: center;
  letter-spacing: 0.1em;
  font-size: 2.6rem;
  font-weight: 300;
  align-self: center;
  grid-area: Heading;
`;

const AddNoteButton = styled.button`
  background-color: #06c73a; // #f46036
  border: none;
  border-radius: 50%;
  height: 3.3rem;
  width: 3.3rem;
  justify-self: start;
  align-self: center;
  margin-left: 15px;
  grid-area: AddNoteButton;
  grid-row-start: 1;
  grid-row-end: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1) rotate(180deg);
  }
`;

const PlusIcon = styled(Plus)`
  color: white;
  width: 1.5rem;
  height: 1.8rem;
  transform: scale(1.3);
`;

const DeleteAllNotes = styled.button`
  padding: 0.6rem;
  background-color: transparent;
  border: 1px solid red;
  border-radius: 10px;
  grid-area: DeleteButton;
  grid-row-start: 1;
  grid-row-end: 3;
  justify-self: end;
  align-self: center;
  margin-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: red;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: red;
    color: white;
  }
`;

const Line = styled.hr`
  color: rgba(0, 0, 0, 0.3);
  margin: 0 auto 1rem;
  width: 5.6rem;
  grid-area: Line;
`;

const List = styled.ul`
  max-height: calc(100% - 5.5rem);
  overflow-y: auto;
`;

// Modal styles
const StyledDiv = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Box = styled.div`
  width: 40%;
  height: 30%;
  background-image: linear-gradient(to bottom right, #5c9fff, #4285f4);
  border-radius: 1rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  box-shadow: 0.1rem 0.1rem 0.6rem 0.1rem rgba(88, 88, 88, 0.3);
`;

const StyledH2 = styled.h2`
  color: white;
  font-size: 2rem;
  text-align: center;
`;

const StyledButtons = styled.div`
  width: 40%;
  margin: 0 auto;
  display: flex;
  justify-content: space-evenly;
`;

const StyledButton = styled.button`
  padding: 1rem 2.5rem;
  border-radius: 1rem;
  border: none;
  font-weight: 500;
  box-shadow: 0rem 0.1rem 0.5rem 0.1rem rgba(88, 88, 88, 0.3);
  transition: transform 0.1s ease;

  &:hover {
    transform: translateY(-0.3rem);
  }
`;

const StyledConfirmButton = styled(StyledButton)`
  border: 1px solid #ff6961; // #ed5e68 or #ff6961
  background-color: #ff6961; // #ed5e68 or #ff6961
  color: white;
`;

const StyledCancelButton = styled(StyledButton)`
  border: 1px solid white;
  background-color: white;
  color: #585858; // #484c65 or #585858
`;

class NotesList extends React.Component {
  state = {
    showModal: false,
  };

  componentDidMount() {
    this.props.fetchNotes();
  }

  deleteNote = async (e, id) => {
    e.stopPropagation();
    await this.props.deleteNote(id);
    this.props.fetchNotes();
  };

  createNewNote = () => {
    history.push('/notes');
    this.props.clearSelectedNote();
  };

  showConfirmModal = () => {
    if (!this.state.showModal) {
      this.setState({ showModal: true });
    }
  };

  closeConfirmModal = () => {
    if (this.state.showModal) {
      this.setState({ showModal: false });
    }
  };

  handleConfirmButton = async () => {
    await this.props.deleteNotes();
    this.setState({ showModal: false });
  };

  render() {
    if (this.props.notesFetched === false) {
      return (
        <Notes>
          <Row>
            <Heading>Notes</Heading>
            <AddNoteButton onClick={this.createNewNote}>
              <PlusIcon />
            </AddNoteButton>
            <DeleteAllNotes onClick={this.showConfirmModal}>
              Delete All
            </DeleteAllNotes>
            <Line />
          </Row>
          <Loader />
        </Notes>
      );
    }

    return (
      <Notes>
        {this.state.showModal ? (
          <Modal>
            <StyledDiv onClick={this.closeConfirmModal}>
              <Box onClick={e => e.stopPropagation()}>
                <StyledH2>
                  Are you sure you want to delete all of your notes?
                </StyledH2>
                <StyledButtons>
                  <StyledConfirmButton
                    type="button"
                    onClick={this.handleConfirmButton}
                  >
                    Confirm
                  </StyledConfirmButton>
                  <StyledCancelButton
                    type="button"
                    onClick={this.closeConfirmModal}
                  >
                    Cancel
                  </StyledCancelButton>
                </StyledButtons>
              </Box>
            </StyledDiv>
          </Modal>
        ) : null}
        <Row>
          <Heading>Notes</Heading>
          <AddNoteButton onClick={this.createNewNote}>
            <PlusIcon />
          </AddNoteButton>
          <DeleteAllNotes onClick={this.showConfirmModal}>
            Delete All
          </DeleteAllNotes>
          <Line />
        </Row>
        <List>
          {_.values(this.props.notes).map(note => (
            <Note
              key={note.id}
              id={note.id}
              noteTitle={note.title}
              noteContent={note.note}
              deleteNote={this.deleteNote}
            />
          ))}
        </List>
      </Notes>
    );
  }
}

const mapStateToProps = state => ({
  notes: state.notes.notes,
  notesFetched: state.notes.notesFetched,
});

export default connect(
  mapStateToProps,
  { fetchNotes, deleteNote, clearSelectedNote, deleteNotes }
)(NotesList);

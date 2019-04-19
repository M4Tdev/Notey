import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import _ from 'lodash';
import { Plus } from 'styled-icons/fa-solid';
import history from '../history';

import { fetchNotes, deleteNote, clearSelectedNote } from '../actions';

// Components
import Note from './Note';

const Notes = styled.div`
  width: 40rem;
  height: 100%;
  border-right: 0.1rem solid rgba(0, 0, 0, 0.3);
`;

const Row = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 4.5rem auto;
  grid-template-areas: 'AddNoteButton Heading .' '. Line .';
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
  transition: transform 0.1s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const PlusIcon = styled(Plus)`
  color: white;
  width: 1.5rem;
  height: 1.8rem;
  transform: scale(1.3);
`;

const Line = styled.hr`
  color: rgba(0, 0, 0, 0.3);
  margin: 0 auto 1rem;
  width: 5.6rem;
  grid-area: Line;
`;

class NotesList extends React.Component {
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

  render() {
    return (
      <Notes>
        <Row>
          <Heading>Notes</Heading>
          <AddNoteButton onClick={this.createNewNote}>
            <PlusIcon />
          </AddNoteButton>
          <Line />
        </Row>
        <ul>
          {_.values(this.props.notes).map(note => (
            <Note
              key={note.id}
              id={note.id}
              noteTitle={note.title}
              noteContent={note.note}
              deleteNote={this.deleteNote}
            />
          ))}
        </ul>
      </Notes>
    );
  }
}

const mapStateToProps = state => ({
  notes: state.notes.notes,
});

export default connect(
  mapStateToProps,
  { fetchNotes, deleteNote, clearSelectedNote }
)(NotesList);

import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import _ from 'lodash';
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
  grid-template-rows: 4.5rem;
  grid-template-areas: '. Heading AddNoteButton';
`;

const Heading = styled.h2`
  text-align: center;
  letter-spacing: 0.1em;
  font-size: 2.6rem;
  font-weight: 300;
  /* margin: 1rem 0 0; */
  align-self: center;
  grid-area: Heading;
`;

const AddNoteButton = styled.button`
  background-color: #f46036;
  border: none;
  border-radius: 0.5rem;
  color: white;
  padding: 0.3rem;
  display: block;
  height: 3rem;
  width: 8rem;
  justify-self: end;
  align-self: center;
  margin-right: 5px;
  font-size: 1.4rem;
  grid-area: AddNoteButton;
`;

const Line = styled.hr`
  color: rgba(0, 0, 0, 0.3);
  margin: 0 auto 1rem;
  width: 5.6rem;
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
          <AddNoteButton onClick={this.createNewNote}>Add Note</AddNoteButton>
        </Row>
        <Line />
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

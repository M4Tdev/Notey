import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import _ from 'lodash';

import { fetchNotes, deleteNote } from '../actions';

// Components
import Note from './Note';

const Notes = styled.div`
  width: 40rem;
  height: 100%;
  border-right: 0.1rem solid rgba(0, 0, 0, 0.3);
`;

const Heading = styled.h2`
  text-align: center;
  letter-spacing: 0.1em;
  font-size: 2.6rem;
  font-weight: 300;
  margin: 1rem 0 0;
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

  render() {
    return (
      <Notes>
        <Heading>Notes</Heading>
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
  { fetchNotes, deleteNote }
)(NotesList);

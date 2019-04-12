import React, { useEffect } from 'react';
import { connect } from 'react-redux';

// Action Creator
import { fetchNote, editNote, fetchNotes } from '../actions';

// Components
import Form from './Form';

const EditNote = props => {
  const { id } = props.match.params;

  const onSubmit = async formValues => {
    await props.editNote(props.match.params.id, formValues);
    await props.fetchNotes();
  };
  /* eslint-disable */
  useEffect(() => {
    async function fetch() {
      await props.fetchNote(id);
    }

    fetch();
  }, [id]);
  /* eslint-enable */

  return (
    <div>
      Edit Note
      <Form onSubmit={onSubmit} selectedNote={props.note} />
    </div>
  );
};

const mapStateToProp = state => ({
  note: state.notes.selectedNote,
});

export default connect(
  mapStateToProp,
  { fetchNote, editNote, fetchNotes }
)(EditNote);

import React, { useEffect } from 'react';
import { connect } from 'react-redux';

// Action Creator
import { fetchNote, editNote, fetchNotes, deleteNote } from '../actions';

// Components
import Form from './Form';

const EditNote = props => {
  const { id } = props.match.params;

  const onSubmit = async formValues => {
    await props.editNote(props.match.params.id, formValues);
    await props.fetchNotes();
  };

  const onNoteDelete = async () => {
    console.log('Deleting note with id:', props.match.params.id);
    await props.deleteNote(props.match.params.id);
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
    <>
      <Form
        onSubmit={onSubmit}
        initialValues={props.note}
        onNoteDelete={onNoteDelete}
      />
    </>
  );
};

const mapStateToProp = state => ({
  note: state.notes.selectedNote,
});

export default connect(
  mapStateToProp,
  { fetchNote, editNote, fetchNotes, deleteNote }
)(EditNote);
